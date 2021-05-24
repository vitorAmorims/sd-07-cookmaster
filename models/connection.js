const { MongoClient } = require('mongodb');

// local:
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';

// avaliador:
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const OPTION = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () => {
  return MongoClient
    .connect(MONGO_DB_URL, OPTION)
    .then((connection) => connection.db(DB_NAME))
    .catch((err) => {
      console.error(err.message);
      process.exit();
    });
};

module.exports = connection;
