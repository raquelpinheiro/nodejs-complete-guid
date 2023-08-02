const MongoDb = require('mongodb');
const getDb = require('../repository/mongodb-database').getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  update() {
    const db = getDb();
    return db.collection('products')
      .updateOne({ $set: this })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db.collection('products').find({}).toArray()
      .then(products => {
        console.log(`All products: ${products}`);
        return products;
      }).catch(err => console.error(err));
  }
  static findById(productId) {
    const db = getDb();
    return db.collection('products').findOne({ _id: new MongoDb.ObjectId(productId) })
      .next()
      .then(product => {
        console.log(`Product: ${product}`);
        return product;
      }).catch(err => console.error(err));
  };
  static deleteById(productId) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new MongoDb.ObjectId(productId) }.next)
      .then(result => {
        console.log(`Product deleted: ${result}`);
      })
      .catch(err => console.error(err));
  }
}

module.exports = Product;