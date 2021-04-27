const connect = require('../config/conn');

const addRecipe = async (name, ingredients, preparation, userId) => 
  connect().then(async (db) => {
    const newRecipe = await db.collection('recipes').insertOne(
      { name, ingredients, preparation, userId },
    );
    return newRecipe.ops[0];
  });

//  const getAll = async () => {
//    
//  };
  
module.exports = {
  addRecipe,
  //  getAll,
};