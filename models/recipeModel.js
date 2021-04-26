const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { name, ingredients, preparation, userId, _id: recipe.insertedId } };
};

const getAll = async () => 
  connection().then((db) => 
  db.collection('recipes').find().toArray());

const getById = async (id) => 
   connection().then((db) => 
   db.collection('recipes').findOne({ _id: ObjectId(id) }));

const update = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;

    const recipe = await connection().then((db) =>
        db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
    return recipe;
};

const updateWithImage = async (id, oneRecipe, image) => {
  const { name, ingredients, preparation, userId } = oneRecipe;  
  if (!ObjectId.isValid(id)) return null;

    const recipe = await connection().then((db) =>
        db
        .collection('recipes')
        .updateOne({ _id: ObjectId(id) }, 
        { $set: { name, ingredients, preparation, userId, image } }));
    return recipe;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => 
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));  
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  updateWithImage,
  exclude,
};