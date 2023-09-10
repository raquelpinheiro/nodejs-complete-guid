const User = require('../models/user');

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
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticate: false
    });
};

exports.postLoginSession = (req, res, next) => {
    if (!req.session.user) {
        User.findOne({ name: 'Raquel' })
            .then(user => {
                if (user) {
                    req.session.user = user;
                    req.session.isLoggedIn = true;
                    req.session.save(err => {
                        console.log(err);
                    });
                }
            })
            .catch(err => console.log(err));
    }
    console.log(req.session);
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};