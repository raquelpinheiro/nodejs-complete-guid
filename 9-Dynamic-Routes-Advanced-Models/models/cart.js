"use strict";

const fs = require('fs');
const path = require('path');
const Product = require('../models/product');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id) {
        fs.readFile(p, (err, buffer) => {
            if (err) {
                console.log(err);
                return;
            }
            this.cart = JSON.parse(buffer);

            const index = this.cart.products.findIndex(p => p.id === id);

            Product.findById(id, (productById) => {
                if (index > -1) {
                    let productAdd = this.cart.products[index];
                    productAdd.quantity++;
                    productAdd.price = productAdd.quantity * productById.price;
                    this.cart.totalPrice = this.cart.totalPrice + productAdd.price;
                    this.cart.products[index] = productAdd;
                } else {
                    let productAdd = { id: id, quantity: 1, price: productById.price };
                    this.cart.products.push(productAdd);
                    this.cart.totalPrice = productById.price;
                }
                fs.writeFile(p, JSON.stringify(this.cart), (err) => {
                    if (err)
                        console.error(err);
                });
            });
        });
    }
    static deleteProduct(productId) {
        fs.readFile(p, (err, buffer) => {
            if (err) {
                return;
            }
            this.cart = JSON.parse(buffer);

            const updatedCart = { ...this.cart };

            const deleteProduct = updatedCart.products.find(p => p.id === productId);

            if (!deleteProduct)
                return;

            updatedCart.totalPrice = updatedCart.totalPrice - deleteProduct.price;
            updatedCart.products = updatedCart.products.filter(p => p.id !== productId);

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                if (err)
                    console.error(err);
            });
        });
    }
    static fetchCart(cb) {
        fs.readFile(p, (err, buffer) => {
            if (err) {
                return;
            }
            this.cart = JSON.parse(buffer);
            let detailsCart = { products: [], totalPrice: 0 };

            for (let prod of this.cart.products) {
                let productCart = {};
                Product.findById(prod.id, (product) => {
                    productCart = { ...product };
                    productCart.price = prod.price;
                    productCart.quantity = prod.quantity;
                    detailsCart.products.push(productCart);

                    detailsCart.totalPrice = this.cart.totalPrice;
                    console.log(detailsCart);
                    cb(detailsCart);
                });
            };

        });
    }
}