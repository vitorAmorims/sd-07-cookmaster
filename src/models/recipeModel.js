const connection = require('../config/connection');

const addRecipe = (name, ingredients, preparation, userId) => connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((item) => item.ops[0]);

const findRecipeById = (id) => connection()
    .then((db) => db.collection('recipes').findOne({ id }));

const findAllRecipes = () => connection()
    .then((db) => db.collection('recipes').find().toArray());

const updateRecipe = async (id, name, ingredients, preparation) => {
    connection().then((db) =>
        db.collection('recipes')
        .updateOne({ _id: id }, { $set: { name, ingredients, preparation } }))
        .then((item) => item.ops[0]);
};

const deleteRecipe = async (id) => {
    connection().then((db) => db.collection('recipes').deleteOne({ _id: id }));
  };

module.exports = {
    addRecipe,
    findRecipeById,
    updateRecipe,
    findAllRecipes,
    deleteRecipe,
};