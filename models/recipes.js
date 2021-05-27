const { ObjectId } = require('mongodb');
const connection = require('./conn');

const addRecipesModel = async (name, ingredients, preparation) => {
  const recipe = { name, ingredients, preparation };
  const db = await connection();
  const product = await db.collection('recipes').insertOne(recipe);
  return product.ops[0];
};

const getAllRecipesModel = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getByIdModel = async (id) => {
  try {
    const db = await connection();
    return db.collection('recipes').findOne({ _id: ObjectId(id) });
  } catch (error) {
    console.log(error.message);
  }
};

const editRecipeModel = async (id, name, ingredients, preparation) => {
  try {
    const recipe = { id, name, ingredients, preparation };
    const db = await connection();
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, 
      { $set: { ...recipe } }, 
    );
    return { ...recipe };
  } catch (error) {
    console.log(error.message);
  }
};

const deleteRecipeModel = async (id) => {
  try {
    const db = await connection();
    await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addRecipesModel,
  getAllRecipesModel,
  getByIdModel,
  editRecipeModel,
  deleteRecipeModel,
};