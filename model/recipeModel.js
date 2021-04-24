const conn = require('./connection');

const insertNewRecipe = async (recipe) => {
  const { insertedId } = await conn().then((db) =>
    db.collection('recipes').insertOne({ ...recipe }));
    return { recipe: { ...recipe, _id: insertedId } };
};

module.exports = {
  insertNewRecipe,
};