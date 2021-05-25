const mongoClient = require('mongodb').MongoClient;

// Conexão local:
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// Conexão remota:
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

module.exports = async () => (
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    })
);