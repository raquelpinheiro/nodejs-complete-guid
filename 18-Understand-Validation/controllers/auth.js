const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const user = require('../models/user');
const { validationResult } = require('express-validator/check');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
                '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'
        }
    })
);

exports.getLoginCookie = (req, res, next) => {
    let isLoggedIn = false;
    const cookies = req.get('Cookie').split(';');
    if (cookies && cookies.length > 0) {
        const index = cookies.indexOf(c => c.split('=')[0] === 'loggedIn');
        if (index > -1) {
            isLoggedIn = cookies[index].split('=')[1];
        }
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticate: isLoggedIn
    });
};

exports.postLoginCookie = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};

exports.getLoginSession = (req, res, next) => {
    let errorMessage = null;
    if (req.flash('error') && req.flash('error').length > 0)
        errorMessage = req.flash('error')[0];

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticate: false,
        errorMessage: errorMessage
    });
};

exports.postLoginSession = (req, res, next) => {
    if (!req.session.user) {
        const email = req.body.email;
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    const userPassword = req.body.password;
                    bcrypt.compare(userPassword, user.password)
                        .then(doMatch => {
                            if (doMatch) {
                                req.session.user = user;
                                req.session.isLoggedIn = true;
                                return req.session.save(err => {
                                    console.log(err);
                                    res.redirect('/');
                                });
                            } else {
                                req.flash('error', 'Invalid password or email');
                                return res.redirect('/login');
                            }
                        }).catch(err => console.log(err));
                } else {
                    req.flash('error', 'User doesnt exist');
                    res.redirect('/login');
                }
            })
            .catch(err => console.log(err));
    }
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/login',
        pageTitle: 'Login',
        validationMessage: '',
        isAuthenticate: false
    })
};

exports.postSignup = (req, res, next) => {
    const userEmail = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg
        });
    }
   
    User.findOne({ email: userEmail })
        .then(user => {
            if (user) {
                req.flash('error', 'User already exist');
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashPassword => {
                    let newUser = new User({
                        email: userEmail, password: hashPassword,
                        cart: { items: [] }
                    });
                    return newUser.save();
                })
                .then(result => {
                    res.redirect('/login');
                    return transporter.sendMail({
                        to: userEmail,
                        from: 'shop@node-complete.com',
                        subject: 'Signup succeeded!',
                        html: '<h1>You successfully signed up!</h1>'
                    });
                })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getReset = (req, res, next) => {
    let errorMessage = null;
    if (req.flash('error') && req.flash('error').length > 0)
        errorMessage = req.flash('error')[0];

    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: errorMessage,
        isAuthenticate: false
    });
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            req.flash('error', 'Ops, an error has happened');
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with that email found')
                    res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/');
                transporter.sendMail({
                    to: req.body.email,
                    from: 'shop@node-complete.com',
                    subject: 'Password reset',
                    html: `
                    <p>You request a password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}">Link</a></p>
                `
                });
            })
            .catch(err => console.log(err));

    });
};


exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.find({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
            let errorMessage = null;
            if (req.flash('error') && req.flash('error').length > 0)
                errorMessage = req.flash('error')[0];

            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: 'New password',
                validationMessage: errorMessage,
                isAuthenticate: false,
                userId: user._id.toString()
            });
        }).catch(err => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    }).then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
    }).then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => console.error(err));
};