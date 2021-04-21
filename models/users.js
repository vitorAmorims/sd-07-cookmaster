const connection = require('./connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('users').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('users').findOne(ObjectId(id)));
};

const getByEmail = async (string) => {
  return await connection()
    .then(db => db.collection('users').findOne({ email: string }));
};

const postdata = async (name, email, password) => {
    // console.log(name, email, password);
  const role = 'user';
  const user = await connection().then((db) =>
    db
      .collection("users")
      .insertOne({ name, email, password, role })
  );

  return { _id: user.insertedId, name, email, role };
};

const editdata = async (id, name, quantity) => {
  const updatedProduct = await connection().then((db) =>
    db.collection('users')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return updatedProduct;
};

const deletedata = async (id) => {
  return await connection().then((db) => 
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