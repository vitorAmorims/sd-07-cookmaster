const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const RECIPES = 'recipes';

const getAll = async () => {
  return connection().then(db => db.collection(RECIPES).find({}).toArray());
};

const getById = async (id) => {
  return connection().then(db =>
    db.collection(RECIPES).findOne(ObjectId(id))
  );
};

const create = async ({name, email, password, role}) => {
  const recipe = await connection().then(db =>
    db.collection(RECIPES).insertOne({ name, ingredients, preparation })
  );
  return { "recipe": {_id: recipe.insertedId, name, ingredients, preparation}};
};

const update = async ({id, name, email, password, role }) => {
  const recipe = await connection().then((db) => db
    .collection(RECIPES)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } })
  );
  return { "recipe": recipe };
};

const exclude = async (id) => {
  return connection().then((db) => db
    .collection(RECIPES)
    .deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
