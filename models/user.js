const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByEmail = async (email) =>
 connection().then((db) => db.collection('users').findOne({ email }));

const findByUser = async (name) =>
connection().then((db) => db.collection('users').findOne({ name }));

const findRecipeById = async (id) =>
   connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));

const getAllRecipes = async () =>
connection().then((db) => db.collection('recipes').find().toArray());
const create = async (email, password, name, role) =>
  connection()
    .then((db) =>
      db.collection('users').insertOne({ name, email, password, role })).then((result) => result);

const createRecipes = async (name, ingredients, preparation, userId) =>
  connection()
        .then((db) =>
          db.collection('recipes')
          .insertOne({ name, ingredients, preparation, userId })).then((result) => result);
module.exports = {
// getAll,
// deleteById,
// updateById,
findRecipeById,
getAllRecipes,
createRecipes,
findByUser,
findByEmail,
// findById,
create,
};