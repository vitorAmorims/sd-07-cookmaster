const { MongoClient } = require('mongodb');

const { MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster' } = process.env;
const { DB_NAME = 'Cookmaster' } = process.env;

const connection = () => MongoClient
  .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => conn.db(DB_NAME));

module.exports = { connection };
