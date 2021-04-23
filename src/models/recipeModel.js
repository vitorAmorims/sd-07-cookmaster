const connection = require('../config/conn');
const { ObjectID } = require('mongodb');

const NAME_COLLECTION = 'recipes';

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection().then(db =>
    db
      .collection(NAME_COLLECTION)
      .insertOne({ name, ingredients, preparation, userId }),
  );
  return newRecipe;
};

const readAll = async () => {
  const recipes = await connection().then(db =>
    db.collection(NAME_COLLECTION).find().toArray(),
  );
  return recipes;
};

const readById = async id => {
  const recipe = await connection().then(db =>
    db.collection(NAME_COLLECTION).findOne({ _id: ObjectID(id) }),
  );
  return recipe;
};

const updateById = async (id, name, ingredients, preparation, userId) => {
  const oldRecipe = await readById(id);
  const newRecipe = connection().then(db =>
    db
      .collection(NAME_COLLECTION)
      .updateOne(
        { _id: ObjectID(id), userId: userId },
        { $set: { ...oldRecipe, name, ingredients, preparation } },
      ),
  );
  return newRecipe;
};

const deleteById = async id => {
  const recipe = await connection().then(db =>
    db.collection(NAME_COLLECTION).deleteOne({ _id: ObjectID(id) }),
  );
  return recipe;
};

module.exports = {
  create,
  readAll,
  readById,
  updateById,
  deleteById,
};
