const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://shopnodejs:shopapp@localhost:27017';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

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

// Adiciona o usuário no contexto da requisição
app.use((req, res, next) => {
  if (!req.session.user) {
    User.findOne({ name: 'Raquel' })
      .then(user => {
        if (user)
          req.session.user = user;       
      })
      .catch(err => console.log(err));
  }
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
  .then(result => {
    User.findOne({ name: 'Raquel' }).then(user => {
      if (!user) {
        const newUser = new User({ name: 'Raquel', email: 'raqueljpinheiro@gmail.com', cart: { items: [] } });
        newUser.save();
      }
    })
    app.listen(3000);
  }).catch(err => console.error(err));