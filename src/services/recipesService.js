const jwt = require('../helpers/jwt');
const userModel = require('../models/userModel');
const recipesModel = require('../models/recipesModel');

const validation = ({ name, ingredients, preparation }) => {
  const ERR_MESSAGE = 'Invalid entries. Try again.';
  if (!name || !ingredients || !preparation) {
    throw new Error(ERR_MESSAGE);
  }
};

const verifyToken = async ({ authorization }) => {
  const decoded = jwt.decodifyToken(authorization);
  if (!decoded) {
    throw new Error('jwt malformed');
  }
  const user = await userModel.getUserByMail(decoded.email);
  return user;
};

/*
const validateProductId = (productId) => {
  const product = productsModel.getById(productId);
  if (!product) throw new Error(ERR_MESSAGE);
}; */
/*
const validateSaleId = (saleId) => {
  const sale = salesModel.getById(saleId);
  if (!sale) throw new Error(ERR_MESSAGE);

  return sale;
}; */

const getById = async (id) => {
  const result = await recipesModel.getById(id);

  if (!result) {
    const ERROR_MESSAGE = 'recipe not found';
    throw new Error(ERROR_MESSAGE);
  }

  return result;
};

const add = async ({ headers, body }) => {
  validation(body);
  const { _id } = await verifyToken(headers);

  return recipesModel.add(_id, body);
};
/*
const getAll = async () => {
  // await jwt.decodifyToken(authorization);

  return recipesModel.getAll();
};
/*
const update = async (id, sale) => {
  const { productId, quantity } = sale;
  validateQuantity(quantity);
  validateProductId(productId);
  validateSaleId(id);

  return salesModel.update(id, productId, quantity);
}; */

// const deleteSale = async (id) => {
//   const sale = await validateSaleId(id);

//   return salesModel.deleteSale(sale);
// };

module.exports = {
  add,
  getById,
};
