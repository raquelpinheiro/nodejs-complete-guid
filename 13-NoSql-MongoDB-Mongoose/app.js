const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Adiciona o usuário no contexto da requisição
app.use((req, res, next) => {
  User.findOne({ name: 'Raquel' })
    .then(user => {
      if (user)
        req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://shopnodejs:shopapp@localhost:27017')
  .then(result => {
    User.findOne({ name: 'Raquel' }).then(user => {
      if (!user) {
        const newUser = new User({ name: 'Raquel', email: 'raqueljpinheiro@gmail.com', cart: { items: [] } });
        newUser.save();
      }
    })
    app.listen(3000);
  }).catch(err => console.error(err));