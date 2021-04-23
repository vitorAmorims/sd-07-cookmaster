const connect = require('../config/conn');

const add = async (name, email, password) =>{
  return connect().then(async (db) => {
    const newUser = await db.collection('users').insertOne({ name, email, password, role: "user" });

    return newUser.ops[0];
  });
};


const getEmailUser = async (email) => {
  return await connect().then((db) => db.collection('users').findOne({email}));
}

module.exports = {
  add,
  getEmailUser,
};