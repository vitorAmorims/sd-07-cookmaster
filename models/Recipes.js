const { ObjectId } = require('mongodb');

const { connection } = require('../config/connection');

const getRecipes = () =>
  connection().then((db) => db.collection('recipes').find().toArray());

const getRecipeById = (id) =>
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)));

const createRecipe = (name, ingredients, preparation, userId) =>
  connection()
    .then((db) =>
      db.collection('recipes').insertOne({
        name,
        ingredients,
        preparation,
        userId,
      }))
    .then((result) => result.ops[0]);

const editRecipe = (id, name, ingredients, preparation) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      ));

const addImage = (id, image) =>
  connection().then((db) =>
    db
      .collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image } }));

const deleteRecipe = (id) =>
  connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getRecipeById,
  getRecipes,
  createRecipe,
  editRecipe,
  deleteRecipe,
  addImage,
};
