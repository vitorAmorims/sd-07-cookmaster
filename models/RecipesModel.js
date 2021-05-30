const { ObjectId } = require('bson');
const connection = require('./connection');

const create = (userId, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').insertOne({
      userId,
      name,
      ingredients,
      preparation,
    }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      ingredients,
      preparation,
      userId,
    }));

const getAll = () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray())
    .then((recipes) => recipes);

const findById = (id) =>
  connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)))
    .then((recipe) => recipe);

const updateById = (id, name, ingredients, preparation) =>
  connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    ))
    .then(() => ({
      id,
      name,
      ingredients,
      preparation,
    }));

const deleteByIdUser = (id, userId) =>
  connection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id), userId: ObjectId(userId) }))
    .then((response) => response.deletedCount);

const deleteByIdAdmin = (id) =>
  connection()
    .then((db) => db.collection('recipes')
      .deleteOne({ _id: ObjectId(id) }))
    .then((response) => response.deletedCount);

const updateImageByIdUser = async (id, userId, filePathName) => {
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id), id: ObjectId(userId) },
      { $set: { image: filePathName } },
    ))
    .then(() => {});
};

const updateImageByIdAdmin = (id, filePathName) =>
  connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { image: filePathName } },
    ))
    .then(() => {});

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteByIdAdmin,
  deleteByIdUser,
  updateImageByIdUser,
  updateImageByIdAdmin,
};
