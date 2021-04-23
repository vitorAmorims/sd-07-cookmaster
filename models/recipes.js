const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAll = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result; 
};

const getById = async (id) => {
  // if (ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

const getByName = async (string) => {
  const result = await connection().then((db) =>
    db.collection('recipes').findOne({ name: string }));
  return result;
};

const postdata = async (id, name, ingredients, preparation) => {
  const recipe = await connection().then((db) =>
    db
      .collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: id }));

  return { _id: recipe.insertedId, name, ingredients, preparation, userId: id };
};

const editdata = async (objParams) => {
  const { userId, id, name, ingredients, preparation } = objParams;
  const updatedRecipe = await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { userId, name, ingredients, preparation } },
      ));
  return updatedRecipe;
};

const deletedata = async (id) => {
  await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
};

const editDataWithPatch = async (objParams) => {
  const update = objParams;
  await connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(objParams._id) }, {$set: update}));
}

module.exports = {
  getAll,
  getById,
  getByName,
  postdata,
  editdata,
  deletedata,
  editDataWithPatch,
};
