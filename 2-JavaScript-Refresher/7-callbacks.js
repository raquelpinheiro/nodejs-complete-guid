
class Product {
    constructor(title, description) {
        this.title = title;
        this.price = 0;
        this.description = description;
    }
    addPrice(price, cb) {
        this.price = price;
        cb();
    }
};

let product = new Product('Bicycle', 'A awesome yellow bicycle');

for(let i = 0; i < 3; i++){
    product.addPrice(100, () => console.log('Price was added'));
}

console.log(`After callback: ${JSON.stringify(product)}`);
