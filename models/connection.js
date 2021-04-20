const mongoClient = require('mongodb');

const local = 'mongodb://mongodb:27017/Cookmaster';
// const local = 'mongodb://localhost:27017/Cookmaster';

const connection = () => mongoClient
    .connect(local, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;