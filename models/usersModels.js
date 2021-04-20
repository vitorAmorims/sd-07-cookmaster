const connect = require('../config/conn');

const collection = 'users';

const add = async (name, email, password, role) =>
  connect().then(async (db) => {
    const user = await db.collection(collection).insertOne({ name, email, password, role });
    
    return user.ops[0];
  });

  const getAll = async () => 
    connect().then((db) => db.collection(collection).find().toArray());

  const getUserByEmail = async (email) => 
    connect().then((db) => db.collection(collection).findOne({ email }));

  module.exports = {
    getAll,
    add,
    getUserByEmail,
  };
