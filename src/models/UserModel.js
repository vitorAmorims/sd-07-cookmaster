const database = require('../database/database');

const usersCollection = 'users';

module.exports = {
  create: async (name, email, password) => {
    const db = await database.connect();
    const { ops } = await db.collection(usersCollection).insertOne({
      name,
      email,
      password,
      role: 'user',
    });
    return ops;
  },
  getByEmail: async (email) => {
    const db = await database.connect();
    return db.collection(usersCollection).findOne({ email });
  },
};
