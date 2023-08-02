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
        console.log(`User: ${user}`);
        return user;
      })
      .catch(err => console.error(err));
  }
  static findByNameEmail(name, email) {
    const db = getDb();
    return db.collection('users').find({ userName: name, email: email })
      .next()
      .then(user => {
        console.log(`User: ${user}`);
        return user;
      })
      .catch(err => console.error(err));
  }
}

module.exports = User;