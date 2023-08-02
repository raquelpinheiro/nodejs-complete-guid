const Sequelize = require('sequelize');

const sequelize = new Sequelize('shop-nodejs', 'root', 'PalioFire06@#', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;