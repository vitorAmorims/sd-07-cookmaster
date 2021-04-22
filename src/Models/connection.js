const { MongoClient } = require('mongodb');
require('dotenv').config();

// URL REMOTE TEST
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
// const DB_NAME = 'Cookmaster';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = () =>
  MongoClient.connect(process.env.DB_URL, options)
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.log(`Database connection error: ${err}`);
      process.exit();
    });
module.exports = connection;
