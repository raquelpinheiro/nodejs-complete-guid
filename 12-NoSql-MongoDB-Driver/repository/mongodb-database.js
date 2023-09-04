const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb://shopnodejs:shopapp@localhost:27017')
    .then(client => {
        console.log('MongoDB connected');
        _db = client.db();
        callback(client);
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
};

const getDb = () => {
    if (_db){
        return _db;
    }
    throw 'No database was found =('
};

exports.getDb = getDb;
exports.mongoConnect = mongoConnect;