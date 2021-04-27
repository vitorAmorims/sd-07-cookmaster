const { MongoClient } = require('mongodb');

const { MONGO_DB_URL, DB_NAME, DB_COLECTION_USERS } = process.env;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db = null;

const connection = () => (
  db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
        db = conn.db(DB_NAME);
        db.collection(DB_COLECTION_USERS).createIndex(
          { email: 1 },
          { unique: true },
        );
        return db;
      })
);

// const connection = () => (db
//     ? Promise.resolve(db)
//     : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
//       db = conn.db(DB_NAME);
//       // db.collection(DB_COLECTION_USERS).createIndex({ email: 1 }, { unique: true });
//       return db;
//     }));

// const connection = async () => {
//   const dataBase = await connectionToDb();
//   await await dataBase.collection(DB_COLECTION_USERS).createIndex({ email: 1 }, { unique: true });
//   return dataBase;
// };

module.exports = connection;
