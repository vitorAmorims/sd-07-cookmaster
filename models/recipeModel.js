const connection = require('../config/conn');

const create = async (name, ingredients, preparation, userId) => {
  const image = 'localhost/';
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, image, userId }));
  return { recipe: { name, ingredients, preparation, image, userId, _id: recipe.insertedId } };
};

module.exports = {
  create,
};