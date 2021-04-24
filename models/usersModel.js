/* const { ObjectId } = require('mongodb'); */
const connection = require('../config/connection');

const registerUser = async (name, email, password, role = 'user') => connection().then((db) =>
  db.collection('users')
    .insertOne({ name, email, password, role }))
  .then((result) => ({ name, email, role, _id: result.insertedId }));

const findUserByEmailAddress = async (email) => connection().then((db) =>
    db.collection('users').findOne({ email }));
    
/* 
const findAllProducts = async () => connection().then((db) =>
    db.collection('products').find({}).toArray());

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error();
  return connection().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) }));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) throw new Error();
  return connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } })
      .then(() => ({ _id: ObjectId(id), name, quantity })));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error();
  return connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then(() => findProductById(id));
}; */

module.exports = {
  registerUser,
  findUserByEmailAddress,
};
