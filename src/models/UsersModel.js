const connect = require('../config/connection');

const create = async (name, email, password, role) => {
    const newUser = await connect()
      .then((db) => db.collection('users')
        .insertOne({ name, email, password, role }));  
    return { user: newUser.ops[0] };
  };

  const readAllUsers = async () => {
    const users = await connect()
      .then((db) => db.collection('users')
        .find({}).toArray());
    return users;
  };

  const findUserByEmail = async (email) => {
    const user = await connect()
      .then((db) => db.collection('users')
        .findOne({ email }));
    return user;
  };

  module.exports = {   
    create, 
    readAllUsers,
    findUserByEmail,
  };