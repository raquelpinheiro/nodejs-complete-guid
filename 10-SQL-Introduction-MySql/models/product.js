const db = require('../repository/mysql-database');

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute('INSERT INTO Products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
   [this.title, this.price, this.imageUrl, this.description]);
  }

  update() {
   
  }

  delete() {
   
  }

  static fetchAll() {
    return db.execute('SELECT * FROM Products');    
  }

  static findById(productId) {
    return db.execute('SELECT * FROM Products WHERE Id = ?', [productId]);
  }
}
