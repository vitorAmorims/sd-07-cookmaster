const { ObjectId } = require('mongodb');
const connect = require('../config/conn');
const error = require('../error/index');

const newRecipe = async (name, ingredients, preparation, id) => 
   connect().then(async (db) => {
   const product = await db.collection('recipes')
     .insertOne({ name, ingredients, preparation, userId: id });
   return product.ops[0];
 });

const getOneRecipe = async () => connect().then((db) => 
  db.collection('recipes').find().toArray());

const searchRecipeForId = async (id) => {
  if (!ObjectId.isValid(id)) throw error.notFoundRecipe;
  return connect().then((db) => 
    db.collection('recipes').findOne(ObjectId(id)));
}; 

const edit = async (id, name, ingredients, preparation) => connect().then(async (db) => {
    await db.collection('recipes').updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      );
    return { _id: id, name, ingredients, preparation };
  });

module.exports = {
   newRecipe,
   getOneRecipe,
   searchRecipeForId,
   edit,
};