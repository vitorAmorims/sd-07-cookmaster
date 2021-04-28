const { MongoClient } = require('mongodb');

// const DEV = 'localhost';
// const TEST = 'mongodb';

const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    userNewParser: true,
    useUnifiedTopology: true,
  }).then((connect) => connect.db(DB_NAME))
    .catch((_error) => {
      process.exit();
    });

module.exports = connection;
