const conn = require('./connection');

const findByEmail = async (user) => {
  const { email } = user;
  console.log(email);
  const result = await conn().then((db) =>
    db.collection('users').findOne({ email }));
    console.log(result);
    return result;
};

const insertNewUser = async (user) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('users').insertOne({ ...user }));
    return { user: { ...user, _id: insertedId } };
};

module.exports = {
  findByEmail,
  insertNewUser,
};