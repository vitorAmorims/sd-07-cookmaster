const connect = require('../config/connection');

const createUser = async (name, quantity) => {
    await connect()
      .then((db) => db.collection('product').insertOne({ name, quantity }))
      .then((response) => response.ops[0]);
    return { name, quantity };
  };

  module.exports = { createUser };