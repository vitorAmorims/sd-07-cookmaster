const database = require('../database');

const usersCollection = 'users';

module.exports = {
  create: async (name, email, password, role) => {
    const db = await database.connect();
    const { ops } = await db.collection(usersCollection).insertOne({
      name,
      email,
      password,
      role,
    });
    return ops;
  },
  getByEmail: async (email) => {
    const db = await database.connect();
    return db.collection(usersCollection).findOne({ email });
  },
};
