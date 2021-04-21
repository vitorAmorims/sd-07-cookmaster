const { MongoClient } = require('mongodb');

const { MONGO_DB_URL, DB_NAME } = process.env;

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    urlNewParsers: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;
