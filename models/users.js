const { ObjectId } = require('mongodb');

const connection = require('./connection');

const getAll = async () => {
  const result = await connection().then((db) =>
    db.collection('users').find().toArray());
  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) =>
    db.collection('users').findOne(ObjectId(id)));
  return result;
};

const getByEmail = async (string) => {
  const result = await connection().then((db) =>
    db.collection('users').findOne({ email: string }));
  return result;
};

const postdata = async (name, email, password) => {
  // console.log(name, email, password);
  const role = 'user';
  const user = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role }));

  return { _id: user.insertedId, name, email, role };
};

const editdata = async (id, name, quantity) => {
  const updatedProduct = await connection().then((db) =>
    db
      .collection('users')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return updatedProduct;
};

const deletedata = async (id) => {
  await connection().then((db) =>
    db.collection('users').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  postdata,
  editdata,
  deletedata,
};
