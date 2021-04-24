const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerRecipe = async (userId, name, ingredients, preparation) => {
  const result = await connection().then((db) => 
    db.collection('recipes').insertOne({ userId, name, ingredients, preparation }));
  return result.ops[0];
};

const getAllRecipes = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

const getRecipe = async (id) => {
  try {
    const result = await connection().then((db) =>
      db.collection('recipes').findOne(ObjectId(id)));
    return result;
  } catch (error) {
    return null;
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const { userId } = await getRecipe(id);
  await connection().then((db) =>
    db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { 
        $set: {
          name,
          ingredients,
          preparation,
        },
      },
    ));

  return { _id: id, name, ingredients, preparation, userId };
};

const deleteRecipe = async (id) => {
  try {
    await connection().then((db) =>
      db.collection('recipes').deleteOne({
        _id: ObjectId(id),
      }));
    return true;
  } catch (error) {
    return null;
  }
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};