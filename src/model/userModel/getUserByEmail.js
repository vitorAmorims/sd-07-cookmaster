const getConnection = require('../connection');

const getUserByEmail = async (email) => {
  try {
    const conn = await getConnection();
    const userFound = await conn.collection('users')
      .findOne({ email });
    return userFound;
  } catch (err) {
    return { status: 'user search fail', err };
  }
};

module.exports = getUserByEmail;
