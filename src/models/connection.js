const mongoClient = require('mongodb');

const connection = () => mongoClient
    .connect('mongodb://mongodb:27017/Cookmaster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
