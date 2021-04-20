const mongoClient = require('mongodb').MongoClient;

const DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'StoreManager';

const connection = async () => {
  mongoClient
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = connection;
