const { MongoClient } = require('mongodb');

// const URL = 'mongodb://localhost:27017/Cookmaster';
const URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () => MongoClient
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db('Cookmaster'))
  .catch((err) => {
    console.error(err);
    process.exit();
});

module.exports = connection;
