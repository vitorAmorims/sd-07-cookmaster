const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (user) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne(user);
  return insertedId;
};

const update = async (id, { name, quantity }) => {
  const db = await connection();
  const { result } = await db.collection('users').updateOne(
    {
      _id: ObjectId(id) },
    {
      $set: {
        name,
        quantity,
      },
    },
  );
  return result;
};

const remove = async (id) => {
  const db = await connection();
  const { result } = await db.collection('users').deleteOne({ _id: ObjectId(id) });
  return result;
};

const findByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;    
};

const findById = async (id) => {
  const db = await connection();
  const product = await db.collection('users').findOne(ObjectId(id));
  return product;    
};

/* const findAll = async () => {
  const db = await connection();
  const users = await db.collection('users').find({}).toArray();
  return users;  
}; */

module.exports = {
  create,
  findByEmail,
  findById,
  update,
  remove,
}; 