// const { ObjectId } = require('mongodb');
const connect = require('../../config/connection');

const COLLECTION_RECIPES_NAME = 'recipes';

const create = async (name, ingredients, preparation, userId) =>
  connect().then(async (db) => {
    const recipe = await db.collection(COLLECTION_RECIPES_NAME)
      .insertOne({ name, ingredients, preparation, userId });
    return recipe.ops[0];
  });

  module.exports = {
    create,
    /* findById,
    findAll,
    update,
    del, */
  };