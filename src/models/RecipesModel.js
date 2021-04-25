const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (recipe) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne(recipe);
  return insertedId;
};

const update = async (id, { name, quantity }) => {
  const db = await connection();
  const { result } = await db.collection('recipes').updateOne(
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
  const { result } = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return result;
};

const findById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;    
};

const findAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;  
};

module.exports = {
  create,
  findById,
  update,
  remove,
  findAll,
}; 