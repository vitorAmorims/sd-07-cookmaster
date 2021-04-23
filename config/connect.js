const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';
// const MONGO_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
const MONGO_DB_URL = `mongodb://mongodb:27017/${DB_NAME}`;

const connection = () =>
  MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
