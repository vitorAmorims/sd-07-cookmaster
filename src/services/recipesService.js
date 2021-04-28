const jwt = require('../helpers/jwt');
const userModel = require('../models/userModel');
const recipesModel = require('../models/recipesModel');

const validation = ({ name, ingredients, preparation }) => {
  const ERR_MESSAGE = 'Invalid entries. Try again.';
  if (!name || !ingredients || !preparation) {
    throw new Error(ERR_MESSAGE);
  }
};

const verifyToken = async (headers) => {
  if (!headers.authorization) {
    throw new Error('missing auth token');
  }
  const { authorization } = headers;
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
}; */

const update = async ({ params, headers, body }) => {
  await verifyToken(headers);
  const { id } = params;
  const recipe = recipesModel.getById(id);
  /* if (user.role === 'admin') {
    return recipesModel.update(id, body);
  }
  if (recipe.userId && recipe.userId === _id) {
    return recipesModel.update(id, body);
  }
  throw new Error('unauthorized'); */
  if (recipe.userId) {
    return recipesModel.update(id, body, recipe.userId);
  }
  return recipesModel.update(id, body);
};

const deleteRecipe = async ({ params, headers }) => {
  await verifyToken(headers);
  const { id } = params;
  const recipe = recipesModel.getById(id);
  return recipesModel.deleteRecipe(recipe);
};

module.exports = {
  add,
  getById,
  update,
  deleteRecipe,
};
