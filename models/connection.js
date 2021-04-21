const { MongoClient } = require('mongodb');

// teste local
const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

// avaliador
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

const connection = () => {
  return MongoClient
    .connect(MONGO_DB_URL, {
      urlNewParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });
};

module.exports = connection;