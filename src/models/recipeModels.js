const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const nonDb = 'Sem conexão com o banco';

const createRecipe = async (name, ingredients, preparation, id) => {
  try {
    // console.log(name);
    return await connect()
      .then((db) => db.collection('recipes')
        .insertOne({ name, ingredients, preparation, userId: ObjectId(id) }));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const getRecipes = async () => {
  try {
    return await connect().then((db) => db.collection('recipes').find().toArray());
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const getRecipesById = async (id) => {
  try {
    return await connect()
      .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    return await connect()
      .then((db) => db.collection('recipes').updateOne(
        { id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      ));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  try {
    return await connect().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
  } catch (error) {
    console.error({ message: nonDb });
  }
};

const putImage = async (id, urlImage) => {
  try {
    const recipe = await getRecipesById(id);
    connect().then((db) => db.collection('recipes')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { image: urlImage } },
    ));
    return { ...recipe, urlImage };
  } catch (error) {
    console.error({ message: nonDb });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  putImage,
};
