// const { ObjectId } = require('mongodb');
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
/*
const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connect()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
}; */

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

// const update = async (id, productId, quantity) => {
//   const sale = await connect()
//     .then(db => db.collection('sales').findOneAndUpdate(
//       {
//         _id: ObjectId(id),
//         'itensSold.productId': productId
//       },
//       { $set: { 'itensSold.$.quantity': quantity } }
//     ));
  
//   return {
//     _id: id,
//     itensSold: [ { productId, quantity }]
//   };
// };

// const deleteSale = (sale) => {
//   connect()
//     .then(db => db.collection('sales').deleteOne(sale));
//   return sale;
// };

module.exports = {
  add,
  getAll,
};
