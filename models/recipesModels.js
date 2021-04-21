const { ObjectId } = require('mongodb');
const connection = require('./connection');

const RECIPES_COLLECTION = 'recipes';

const createRecipe = ({ name, ingredients, preparation, userId }) => 
  connection().then((db) => db.collection(RECIPES_COLLECTION).insertOne({
      name,
      ingredients,
      preparation,
      userId,
  })).then((result) => ({
    recipe: {
      name,
      ingredients,
      preparation,
      userId,
      _id: result.insertedId,
    },
  }));

const findAllRecipes = () => 
  connection()
  .then((db) => db.collection(RECIPES_COLLECTION).find().toArray());

const findById = (id) => connection()
  .then((db) => db.collection(RECIPES_COLLECTION).findOne({ _id: ObjectId(id) }));

const updateRecipe = ({ name, ingredients, preparation }, id) => connection()
  .then((db) => db.collection(RECIPES_COLLECTION).updateOne(
    { _id: ObjectId(id) },
    { $set: {
      name,
      ingredients,
      preparation,
    } },
  ));

module.exports = {
  createRecipe,
  findAllRecipes,
  findById,
  updateRecipe,
};