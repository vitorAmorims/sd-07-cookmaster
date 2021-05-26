const { MongoClient } = require('mongodb');

const config = {
  local: {
    MONGO_DB_URL: 'mongodb://localhost:27017/Cookmaster',
    DB_NAME: 'Cookmaster',
  },

  evaluator: {
    MONGO_DB_URL: 'mongodb://mongodb:27017/Cookmaster',
    DB_NAME: 'Cookmaster',
  },
};

let db = null;

const connection = () => (
  db 
    ? Promise.resolve(db)
    : MongoClient.connect(config.evaluator.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    })
      .then((conn) => {
        db = conn.db(config.evaluator.DB_NAME);
        return db;
      })
      .catch((err) => {
        throw new Error(`Não foi possível conectar ao banco de dados:\n${err}`);
      })
);

module.exports = connection;
