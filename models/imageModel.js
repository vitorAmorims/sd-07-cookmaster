/** @format */

const { ObjectId } = require('mongodb');
const { connection } = require('../database');
const { findRecipeId } = require('./recipeModel');
const { RECIPE } = require('../CODE_ERROR');

const imageModel = async (id, image) =>
  connection().then((db) =>
    db.collection(
      RECIPE.updateOne({ _id: ObjectId(id) }, { $set: { image } }).then(() => findRecipeId(id)),
      ));

module.exports = { imageModel };
