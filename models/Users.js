const connect = require('../config/conn');

const addUser = async (name, email, password) => {  
  const newUser = await connect().then(async (db) => {
    const user = await db.collection('users').insertOne({ name, email, password, role: 'user' });

    return user.ops[0];
  });
  
  return newUser;
};

const getByEmail = async (email) => 
  connect().then((db) => db.collection('users').findOne({ email }));

const findUser = async (email, password) => 
  connect().then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  addUser,
  getByEmail,
  findUser,
};