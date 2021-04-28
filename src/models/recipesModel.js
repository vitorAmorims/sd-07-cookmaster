const { ObjectId } = require('mongodb');
const connect = require('../../config/connection');

const getAll = async () => {
  const recipes = await connect()
  .then((db) => db.collection('recipes').find().toArray());
  const responseModel = recipes.map((dbRecipe) => {
    if (dbRecipe.userId) {
      const { _id, recipe, userId } = dbRecipe;
      const { name, ingredients, preparation } = recipe;
      return { _id, name, ingredients, preparation, userId };
    }
    const { _id, name, ingredients, preparation } = dbRecipe;
    return { _id, name, ingredients, preparation };
  });
  return responseModel;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const dbRecipe = await connect()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  if (dbRecipe.userId) {
    const { _id, recipe, userId } = dbRecipe;
    const { name, ingredients, preparation } = recipe;
    return { _id, name, ingredients, preparation, userId };
  }
  const { _id, name, ingredients, preparation } = dbRecipe;
  return { _id, name, ingredients, preparation };
};

const add = async (userId, recipe) => {
  const newRecipe = await connect()
    .then((db) => db.collection('recipes')
    .insertOne({ recipe, userId }));

  const { name, ingredients, preparation } = recipe;
  
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: newRecipe.insertedId,
  } };
};

const update = async (id, data) => {
  const { name, ingredients, preparation } = data;
  await connect()
    .then((db) => db.collection('recipes').findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      { $set: { recipe: {
        name,
        ingredients,
        preparation,
      } } },
    ));
  
  return { name, ingredients, preparation };
};

// const deleteSale = (sale) => {
//   connect()
//     .then(db => db.collection('sales').deleteOne(sale));
//   return sale;
// };

module.exports = {
  add,
  getAll,
  getById,
  update,
};
