const connection = require('../config/conn');

const create = async (name, email, password, role) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  return { user: { name, email, password, role, _id: user.insertedId } };
};

module.exports = {
  create,
};