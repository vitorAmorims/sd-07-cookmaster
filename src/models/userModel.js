const connect = require('../configs/connection');

const isEmailExists = async (email) => {
  const emailRes = await connect().then((db) => db.collection('users').findOne({ email }));
  return emailRes;
};

const createUser = async (username, email, password, role = 'user') => {
  const userRes = await connect().then((db) => 
    db.collection('users').insertOne({ name: username, email, password, role }));
  return { user: userRes.ops[0] };
};

// const createUser = async (username, email, password) => {
//   const userRes = await connect().then((db) => 
//     db.collection('users').insertOne({ name: username, email, password, role: 'ad' }));
//   return { user: userRes.ops[0] };
// };

module.exports = {
  isEmailExists,
  createUser,
};