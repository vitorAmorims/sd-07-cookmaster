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

  const update = async ({ id, name, ingredients, preparation, userId }) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    await connect().then((db) => db.collection(COLLECTION_NAME)
      .updateOne({ _id: ObjectId(id) }, [{
        $set: { name, ingredients, preparation } }]));
    return { _id: id, name, ingredients, preparation, userId };
  };

  const updateImage = async (id, image) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    await connect().then((db) => db.collection(COLLECTION_NAME)
      .updateOne({ _id: ObjectId(id) },
        [{ $set: { image } }]));
    return { _id: id, image };
  };

  const exclude = async (id) => connect()
  .then((db) => db.collection(COLLECTION_NAME).deleteOne({ _id: ObjectId(id) }));

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude,
  updateImage,
};
