const connect = require('../config/conn');

const newRecipe = async (name, ingredients, preparation, id) => 
   connect().then(async (db) => {
   const product = await db.collection('recipes')
     .insertOne({ name, ingredients, preparation, id });
   return product.ops[0];
 });

const getOneRecipe = async () => connect().then((db) => 
  db.collection('recipes').find().toArray());

module.exports = {
   newRecipe,
   getOneRecipe,
};