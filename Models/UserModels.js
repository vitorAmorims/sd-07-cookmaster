const jwt = require('jsonwebtoken');
const connect = require('../config/conn');

const add = async (name, email, password) => connect().then(async (db) => {
    const newUser = await db.collection('users').insertOne({ name, email, password, role: 'user' });

    return newUser.ops[0];
  });

const getEmailUser = async (email) => connect().then((db) => 
   db.collection('users').findOne({ email }));

const secret = 'umasenhaqualquer';

const jwtConfig = { expiresIn: '3d', algorithm: 'HS256' };

const token = (user) => {
  const objToken = { id: user.id, email: user.email, role: user.role };

  const myToken = jwt.sign({ data: objToken }, secret, jwtConfig);
  return myToken;
};

module.exports = {
  add,
  getEmailUser,
  token,
};