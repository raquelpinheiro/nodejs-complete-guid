const fs = require('fs');
const path = require('path');

const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }
    save() {

        const filePath = path.join(require.main.filename, 'data', 'products.json');
        let productsFile = [];

        fs.readFile(filePath, (err, buffer) => {
            if (err === null) {
                productsFile = JSON.stringify(buffer);
            }
        });
        productsFile.push(this);

        fs.writeFile(filePath, Buffer.from(productsFile), (err) => {
            if (err !== null)
                console.error(err);
            else
                console.log('-- OK --');
        });
    }
    static fetchAll() {
        return products;
    }
};