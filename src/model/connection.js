require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;

// local
const MONGO_DB_URI = process.env.DB_URI || 'mongodb://mongodb:27017/Cookmaster';

// remote
// const MONGO_DB_URI = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const conn = async () => {
  try {
    const uriConn = await mongoClient.connect(MONGO_DB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true,
  });
    return uriConn.db(DB_NAME);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = conn;
