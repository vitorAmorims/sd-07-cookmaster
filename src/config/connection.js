const { MongoClient } = require('mongodb');
// mongodb://localhost:27017/Cookmaster
// mongodb://mongodb:27017/Cookmaster
const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGODB_URL, {
      urlNewParser: true,
      useUnifiedTopology: true,
    });
    return conn.db('Cookmaster');
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
};

module.exports = connection; 