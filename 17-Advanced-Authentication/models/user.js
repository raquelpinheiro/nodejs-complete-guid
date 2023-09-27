const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: false
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number }
    }]
  }
});

userSchema.methods.addToCart = function (product) {
  if (this.cart.items.some(c => c.productId.toString() === product._id.toString())) {
    let productIndex = this.cart.items.findIndex(p => p.productId.toString() === product._id.toString());
    let productCart = this.cart.items[productIndex];
    productCart.quantity += 1;
    this.cart.items[productIndex] = productCart;
    this.cart.totalPrice += productCart.price;
  } else {
    this.cart.items.push({ productId: product._id, quantity: 1 });
    this.cart.totalPrice += product.price;
  }
  return this.save();
};

userSchema.methods.removeItemFromCart = function(productId) {
  const cartItems = this.cart.items.filter(c => c.productId !== productId);
  this.cart.items = cartItems;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);