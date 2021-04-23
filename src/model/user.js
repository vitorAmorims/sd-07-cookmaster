const connection = require('../configs');

const createUser = async (name, email, password, role) => {
  try {
    const result = await connection().then((db) =>
      db.collection('users').insertOne({ name, email, password, role }));
    return { ...result.ops[0] };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const getByEmail = async (email) => {
  try {
    const result = await connection().then((db) =>
      db.collection('users').findOne({ email }));
    return result;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

module.exports = { createUser, getByEmail };