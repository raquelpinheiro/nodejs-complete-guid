const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err || fileContent.length === 0) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      let productAdd = [];
      if (products.length > 0)
        productAdd = [...products];
      productAdd.push(this);
      fs.writeFile(p, JSON.stringify(productAdd), err => {
        console.log(err);
      });
    });
  }

  update() {
    getProductsFromFile(products => {
      const index = products.findIndex(p => p.id === this.id);
      let productUpdate = [...products];
      productUpdate[index] = this;
      fs.writeFile(p, JSON.stringify(productUpdate), err => {
        console.log(err);
      });
    });
  }

  delete() {
    getProductsFromFile(products => {
      let updateProducts = [...products];
      updateProducts = updateProducts.filter(p => p.id !== this.id);
      fs.writeFile(p, JSON.stringify(updateProducts), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(productId, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === productId);
      cb(product);
    });
  }
}
