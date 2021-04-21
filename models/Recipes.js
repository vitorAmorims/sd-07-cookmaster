const { ObjectId } = require('mongodb');
const connect = require('../config/conn');

const add = async (name, ingredients, preparation, userId) => {  
  const newRecipe = await connect().then(async (db) => {
    const recipe = await db.collection('recipes').insertOne(
      { name, ingredients, preparation, userId },
    );

    return recipe.ops[0];
  });
  
  return newRecipe;
};

const getAll = async () => connect().then((db) => db.collection('recipes').find({}).toArray());

const getById = async (id) => {  
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));  
};

const update = async (id, name, ingredients, preparation) => 
   connect().then(async (db) => {
    await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

    return { _id: id, name, ingredients, preparation };
  });

const remove = async (id) => 
  connect().then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const updateWithImage = async (id, image) => {
  connect().then(async (db) => {
    await db.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { image } });    
  });
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
  updateWithImage,
};