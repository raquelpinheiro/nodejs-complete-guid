
exports.getLoginCookie = (req, res, next) => {
    let isLoggedIn = false;
    const cookies = req.get('Cookie').split(';');
    if (cookies && cookies.length > 0) {
        const index = cookies.indexOf(c => c.split('=')[0] === 'loggedIn');
        if (index > -1){
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
    const isLoggedIn = req.session.isLoggedIn;
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticate: isLoggedIn
    });
};

exports.postLoginSession = (req, res, next) => {
    req.session.isLoggedIn = true;
    console.log(req.session);
    res.redirect('/');
};