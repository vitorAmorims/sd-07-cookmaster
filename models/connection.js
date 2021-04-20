const { MongoClient } = require('mongodb');

const connection = () => MongoClient
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(process.env.DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });    

module.exports = connection;
