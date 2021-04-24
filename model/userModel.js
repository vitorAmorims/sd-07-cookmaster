const { ObjectId } = require('bson');
const connection = require('./connection');

const getAllUser = async () =>
  connection()
    .then((db) => db.collection('users').find().toArray())
    .then((documents) => documents);

const getAllRecipes = async () =>
connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((documents) => documents);

const getRecipesById = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection()
      .then((db) => db.collection('recipes').find({ _id: ObjectId(id) }).toArray())
      .then((documents) => documents[0]); 
  }
  return null;
};

const putRecipesById = async (idRecipes, name, ingredients, preparation) => {
  if (ObjectId.isValid(idRecipes)) {
    connection().then((db) => db.collection('recipes')
      .updateOne(
        { _id: ObjectId(idRecipes) }, { $set: { name, ingredients, preparation } },
      ));
  }
};

const delRecipesById = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection()
      .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  }
  return null;
};

const getEmail = async (email) =>
  connection()
    .then((db) => db.collection('users').find({ email }).project({ _id: 0, email: 1 }).toArray())
    .then((documents) => documents);

const getId = async (email) =>
connection()
  .then((db) => db.collection('users').find({ email }).project({ _id: 1 }).toArray())
  .then((documents) => documents);

const getPassword = async (email) =>
connection()
  .then((db) => db.collection('users').find({ email }).project({ _id: 0, password: 1 }).toArray())
  .then((documents) => documents);

const createUser = async (name, email, password, role) =>
  connection()
    .then((db) =>
      db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      email,
      password,
      role,
    }));

const createRecipe = async (recipe) =>
  connection()
    .then((db) =>
      db.collection('recipes').insertOne(recipe))
    .then((result) => result);

module.exports = {
  getAllUser,
  createUser,
  getEmail,
  getPassword,
  getId,
  createRecipe,
  getAllRecipes,
  getRecipesById,
  delRecipesById,
  putRecipesById,
};
