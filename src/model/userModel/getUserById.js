const { ObjectId } = require('mongodb');
const getConnection = require('../connection');

const getUserById = async (id) => {
  try {
    const conn = await getConnection();
    const userFound = await conn.collection('users')
      .findOne({ _id: ObjectId(id) });
    return userFound;
  } catch (err) {
    return { status: 'user search fail', err };
  }
};

module.exports = getUserById;
