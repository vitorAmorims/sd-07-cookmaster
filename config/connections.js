const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';
console.log('nonato');

const connection = () => MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;
