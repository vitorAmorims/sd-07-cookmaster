// const { ObjectId } = require('mongodb');
const connection = require('../configurations/connection');

const { DB_COLECTION_USERS } = process.env;

const createNewUser = async (name, email, password, role) => {
  const db = await connection();
  return db.collection(DB_COLECTION_USERS).insertOne({ name, email, password, role });
};

const getByEmailAndPassword = async (email, password) => {
  const db = await connection();
  return db
    .collection(DB_COLECTION_USERS)
    .findOne({
      $and: [
        { email },
        { password },
      ],
    },
    { projection: { _id: false, userId: '$_id', email: true, password: true, role: true } });
};

module.exports = {
  createNewUser,
  getByEmailAndPassword,
};