const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () =>
  MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;