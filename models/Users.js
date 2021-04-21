const connect = require('../config/conn');

const add = async (name, email, password, role) => {  
  const newUser = await connect().then(async (db) => {
    console.log(name);
    const user = await db.collection('users').insertOne({ name, email, password, role });

    return user.ops[0];
  });
  
  return newUser;
};

const getByEmail = async (email) => 
  connect().then((db) => db.collection('users').findOne({ email }));

const findUser = async (email, password) => 
  connect().then((db) => db.collection('users').findOne({ email, password }));

module.exports = {
  add,
  getByEmail,
  findUser,
};