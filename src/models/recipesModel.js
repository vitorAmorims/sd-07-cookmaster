const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');

const getAll = () => connect()
  .then(db => db.collection('sales').find().toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connect()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
};

const add = async (sales) => {
  const sale = await connect()
    .then(db => db.collection('sales').insertOne({ itensSold: sales }));

  return { _id: sale.insertedId, itensSold: sales };
};

const update = async (id, productId, quantity) => {
  const sale = await connect()
    .then(db => db.collection('sales').findOneAndUpdate(
      {
        _id: ObjectId(id),
        'itensSold.productId': productId
      },
      { $set: { 'itensSold.$.quantity': quantity } }
    ));
  
  return {
    _id: id,
    itensSold: [ { productId, quantity }]
  };
};

const deleteSale = (sale) => {
  connect()
    .then(db => db.collection('sales').deleteOne(sale));
  return sale;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteSale
};
