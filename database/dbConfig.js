const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGODB_URL = process.env.DB_HOST; // local
// const MONGODB_URL = 'mongodb://mongodb:27017/Cookmaster'; // avaliador

const connection = async () => {
  try {
        const conn = await MongoClient.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return conn.db(process.env.DB_NAME);
    } catch (err) {
        console.error(err);
        process.exit();
    }
};

module.exports = connection;