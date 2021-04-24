// const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const addRecipe = async () => connection().then((db) => db.collection('products'));

module.exports = {
  addRecipe,
};
