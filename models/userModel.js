const jwt = require('jsonwebtoken');
const connection = require('../config/conn');

const secret = 'abc';

const create = async (name, email, password, role) => {
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));
  return { user: { name, email, password, role, _id: user.insertedId } };
};

const findUser = async (email) => {
    const user = await connection().then((db) =>
    db.collection('users').findOne({ email }));
    
    if (!user) {
      return { message: 'usuário inexistente' };      
    }

    const jwtConfig = {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
    };
    
    const { _id } = user;
    const token = jwt.sign({ id: _id }, secret, jwtConfig);
  
    return { token };
};

module.exports = {
  create,
  findUser,
};