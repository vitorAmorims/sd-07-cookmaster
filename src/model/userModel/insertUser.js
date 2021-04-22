const getConnection = require('../connection');

const insertUser = async ({ email, name, password, role }) => {
  try {
  const conn = await getConnection();
  const insertionRes = await conn.collection('users')
    .insertOne({ name, email, password, role });
  return insertionRes.ops;
  } catch (err) {
    return [{ status: 'insertion fail', err }];
  }
};

module.exports = insertUser;
