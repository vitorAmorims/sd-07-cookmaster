const connection = require('./connection');

const findByEmail = async (email) =>
 connection().then((db) => db.collection('users').findOne({ email }));
const create = async (email, password, name, role) =>
  connection()
    .then((db) =>
      db.collection('users').insertOne({ name, email, password, role })).then((result) => result);

module.exports = {
// getAll,
// deleteById,
// updateById,
findByEmail,
// findById,
create,
};