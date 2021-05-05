const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const createRecipes = async (name, ingredients, preparation, id) =>
  connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id }))
    .then((result) => result.ops[0]);

const getAllRecipes = async () => (
  connection().then(async (db) => {
    const recipes = await db.collection('recipes').find().toArray();
    // console.log('recipes no model', recipes);
    return recipes;
  })
);

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const data = await connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  // console.log('data', data);
  return data;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getById,
};
