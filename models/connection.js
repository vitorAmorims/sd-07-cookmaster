const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = 'Cookmaster';
const MONGODB_URL = process.env.IS_LOCAL 
  ? 'mongodb://127.0.0.1:27017'
  : 'mongodb://mongodb:27017';

const connection = () => MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

module.exports = connection;