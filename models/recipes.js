const connection = require('./connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then((db) =>
    db.collection('recipes').find().toArray()
  );
};

const getById = async (id) => {
  // if (ObjectId.isValid(id)) return null;
  return await connection().then((db) =>
    db.collection('recipes').findOne(ObjectId(id))
  );
};

const getByName = async (string) => {
  return await connection().then((db) =>
    db.collection('recipes').findOne({ name: string })
  );
};

const postdata = async (id, name, ingredients, preparation) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId: id })
  );

  return { _id: recipe.insertedId, name, ingredients, preparation, userId: id };
};

const editdata = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } }
      )
  );
  return updatedRecipe;
};

const deletedata = async (id) => {
  return await connection().then((db) =>
    db.collection('recipes').deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  postdata,
  editdata,
  deletedata,
};
