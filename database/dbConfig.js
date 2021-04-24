const { MongoClient } = require('mongodb');

// const MONGODB_URL = 'mongodb://localhost:27017/Cookmaster'; // local
const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster'; // avaliador
const DB_NAME = 'Cookmaster';
const connection = async () => {
  try {
        const conn = await MongoClient.connect(MONGODB_URL, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        return conn.db(DB_NAME);
    } catch (err) {
        console.error(err);
        process.exit();
    }
};

module.exports = connection;