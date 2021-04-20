const mongoClient = require('mongodb');

const connection = () => mongoClient
    .connect('mongodb://localhost:27017/StoreManager', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
