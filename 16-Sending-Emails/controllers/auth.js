const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

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
    User.findOne({ email: userEmail }).then(user => {
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
                    to: email,
                    from: 'shop@node-complete.com',
                    subject: 'Signup succeeded!',
                    html: '<h1>You successfully signed up!</h1>'
                });
            }).catch(err => console.error(err));
    })
        .catch(err => {
            console.log(err);
        });
};