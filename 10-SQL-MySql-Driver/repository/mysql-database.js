const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'shop-nodejs',
    password: 'PalioFire06@#',
    port: 3306
});

module.exports = pool.promise();