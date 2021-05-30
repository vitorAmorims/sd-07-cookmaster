const { MongoClient } = require('mongodb');

const CONFIGS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Para teste local:
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// Para teste projeto:
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, CONFIGS)
        .then((conn) => {
          db = conn.db(DB_NAME);
          return db;
        })
        .catch((err) => {
          console.error(err);
          process.exit(1);
        }));

module.exports = connection;
