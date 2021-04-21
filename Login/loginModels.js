const conn = require('../connection');

const findUser = async (email) => {
  const user = await conn().then((db) => db.collection('users').findOne({ email }));

  return user;
}; // req. 2

module.exports = {
  findUser,
};