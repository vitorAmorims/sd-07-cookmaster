const salesModel = require('../models/recipesModel');
// const productsModel = require('../models/productsModel');

const ERR_MESSAGE = 'Wrong product ID or invalid quantity';
/*
const validateQuantity = (quantity) => {
  const ZERO = 0;

  if (typeof quantity !== 'number'
  || quantity < ZERO || quantity === ZERO) {
    throw new Error(ERR_MESSAGE);
  }
};
/*
const validateProductId = (productId) => {
  const product = productsModel.getById(productId);
  if (!product) throw new Error(ERR_MESSAGE);
}; */

const validateSaleId = (saleId) => {
  const sale = salesModel.getById(saleId);
  if (!sale) throw new Error(ERR_MESSAGE);

  return sale;
};
/*
const getById = async (id) => {
  const result = await salesModel.getById(id);

  if(!result) {
    const ERROR_MESSAGE = 'Sale not found';
    throw new Error(ERROR_MESSAGE);
  }

  return result;
};
/*
const add = async (sales) => {
  sales.forEach(sale => {
    const { productId, quantity } = sale;
    validateQuantity(quantity);
    validateProductId(productId);
  });

  return salesModel.add(sales);
};

const update = async (id, sale) => {
  const { productId, quantity } = sale;
  validateQuantity(quantity);
  validateProductId(productId);
  validateSaleId(id);

  return salesModel.update(id, productId, quantity);
}; */

const deleteSale = async (id) => {
  const sale = await validateSaleId(id);

  return salesModel.deleteSale(sale);
};

module.exports = {
  deleteSale,
};
