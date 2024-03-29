const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const csrf = require('csurf');
const flash = require('connect-flash');

const MONGO_DB_HOST = 'mongodbshopnode';
const MONGODB_URI = `mongodb://${MONGO_DB_HOST}`;

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  connectionOptions: { useNewUrlParser: true }
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'mysecret', resave: false,
  saveUninitialized: false, store: store
}));

app.use(csrfProtection);
app.use(flash());

// Adiciona o usuário no contexto da requisição
app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.isLoggedIn = false;
    next();
  } else {
    User.findById(req.session.user._id)
      .then(user => {
        if (user)
          req.user = user;
        next();
      })
      .catch(err => console.log(err));
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticate = req.session.isLogged;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  }).catch(err => console.error(err));