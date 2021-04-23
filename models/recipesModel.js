const { ObjectId } = require('mongodb');
const connect = require('./connection');

const addNewRecipe = async (name, ingredients, preparation, userId) =>
  connect().then(async (db) => {
    const product = await db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId });
    return product.ops[0];
  });

function getAllRecipes() {
  return connect().then((db) => db.collection('recipes').find().toArray());
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
}

async function update(id, name, ingredients, preparation) {
  return connect().then(async (db) => {
    await db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      );
    return { _id: id, name, ingredients, preparation };
  });
}

module.exports = {
  addNewRecipe,
  getAllRecipes,
  getById,
  update,
};
