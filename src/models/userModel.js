const connect = require('../../config/connection');
// const { ObjectId } = require('mongodb');
/*
const getAll = () => connect()
  .then(db => db.collection('products').find().toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connect()
    .then(db => db.collection('products').findOne(ObjectId(id)));
}; */

const add = async ({ name, email, password }) => {
  const role = 'user';
  const user = await connect()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));

  return { user: {
    name, email, password, role, _id: user.insertedId } };
};

const getUserByMail = (string) => connect()
  .then((db) => db.collection('users').findOne({ email: string }));

const getEmailAndPassword = ({ email, password }) => connect()
  .then((db) => db.collection('users').findOne({ email, password }));
  /*
const update = (id, name, quantity) => {
  const updatedProduct = connect()
    .then(db => db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } }
    ));
  return { _id: updatedProduct.insertedId, name, quantity };
};

const deleteProduct = (product) => {
  connect()
    .then(db => db.collection('products').deleteOne(product));
  return product;
}; */

module.exports = {
  add,
  getUserByMail,
  getEmailAndPassword,
};
