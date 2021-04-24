const { ObjectId } = require('mongodb');
const connect = require('../../config/conn');

const COLLECTION_NAME = 'recipes';

const add = async (name, ingredients, preparation, id) =>
  connect().then(async (db) => {
    const recipe = await db.collection(COLLECTION_NAME)
    .insertOne({ name, ingredients, preparation, userId: id });
    return recipe.ops[0];
  });
  const getAll = async () => connect()
  .then((db) => db.collection(COLLECTION_NAME).find().toArray());

  const getById = async (id) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return connect().then((db) => db.collection(COLLECTION_NAME).findOne(ObjectId(id)));
  };

module.exports = {
  add,
  getAll,
  getById,
};
