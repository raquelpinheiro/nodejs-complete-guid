const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./repository/mongodb-database').mongoConnect;
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

  User.findByNameEmail('raquel', 'raqueljpinheiro@gmail.com')
    .then(user => {
      //req.user = Object.assign(new User('', ''), user);
      req.user = Object.assign(User.prototype, user);
      next();
    })
    .catch(err => console.log(err)); 
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  User.findByNameEmail('raquel', 'raqueljpinheiro@gmail.com')
    .then(user => {
      if (!user) {
        let user = new User('raquel', 'raqueljpinheiro@gmail.com');
        user.save();
      }
    })
    .catch(err => console.log(err));

  app.listen(3000);
});