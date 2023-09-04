const MongoDb = require('mongodb');
const getDb = require('../repository/mongodb-database').getDb;

class User {
  constructor(userName, email) {
    this.userName = userName;
    this.email = email;
  }
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new MongoDb.ObjectId(userId) })
      .next()
      .then(user => {
        console.log(`User: ${JSON.stringify(user)}`);
        return user;
      })
      .catch(err => console.error(err));
  }
  static findByNameEmail(name, email) {
    const db = getDb();
    return db.collection('users').find({ userName: name, email: email })
      .next()
      .then(user => {
        return user;
      })
      .catch(err => console.error(err));
  }
  addToCart(product) {
    const db = getDb();
    if (!this.hasOwnProperty('cart')) {
      this.cart = { items: [{ productId: new MongoDb.ObjectId(product._id), quantity: 1 }], totalPrice: product.price };
    } else {
      if (this.cart.items.some(c => c.id === product._id)) {
        let productIndex = this.cart.items.findIndex(p => p.id === product._id);
        let productCart = this.cart.items[productIndex];
        productCart.quantity += 1;
        this.cart.items[productIndex] = productCart;
        this.cart.totalPrice += productCart.price;
      } else {
        this.cart.items.push({ productId: new MongoDb.ObjectId(product._id), quantity: 1 });
        this.cart.totalPrice += product.price;
      }
    }
    return db.collection('users')
      .updateOne({ _id: new MongoDb.ObjectId(this._id) }, { $set: {cart: this.cart } })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  getCart() {
    if (!this.cart.items){
      return Promise.resolve( { items: [], totalPrice: 0 });
    }
    const productsId = this.cart.items.map(i => i.productId);
    const db = getDb();
    return db.collection('products')
      .find({ _id: { $in: productsId } })
      .toArray()
      .then(products => {
        const items = products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
        return items;
      })
      .catch(err => console.error(err));
  }
  removeItemFromCart(productId) {
    const cartItems = this.cart.items.filter(c => c.productId !== productId);
    const db = getDb();
    return db.collection('users')
      .updateOneOne({ _id: new MongoDb.ObjectId(this._id) }, { $set: {cart: cartItems }})
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(cart => {
        const order = { items: cart, user: { _id: new MongoDb.ObjectId(this._id) } };
        return db.collection('orders').insertOne(order)
      })
      .then(result => {
        return db.collection('users')
          .updateOne(
            { _id: new MongoDb.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }
  getOrders() {
    const db = getDb();
    return db.collection('orders')
      .find({'user._id': new MongoDb.ObjectId(this._id) })
      .toArray();
  }
}

module.exports = User;