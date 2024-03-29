const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Adiciona o usuário no contexto da requisição
app.use((req, res, next) => {
    /*
    User.findById(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
    */
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

