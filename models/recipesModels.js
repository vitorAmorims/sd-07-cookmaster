const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const getProductsList = async () => connection().then((db) => db.collection('products'));

module.exports = {
  getProductsList,
};
