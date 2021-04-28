require('dotenv');
const jwt = require('jsonwebtoken');
const { validMongoId } = require('../validation');
const { delRecipe, getRecipeById } = require('../../model');
const { INVALID_PRODUCT_ID } = require('../servDictionary');

const handleAdminDeletion = async (productId) => {
  const deltionRes = delRecipe(productId);
    return deltionRes.err
      ? { status: 'error in deletion' }
      : { status: 'deleted' };
};

const handleUserDeletion = async (pdtId, userId) => {
  const recipeFromDb = await getRecipeById(pdtId);
  if (recipeFromDb.userId !== userId) return { status: 'permition denied' };
  const deleted = await delRecipe(pdtId);
  return { status: 'deleted', deleted };
};

const tokenValidation = (tkn) => {
  try {
    const jwtDecoded = jwt.verify(tkn, process.env.SECRET || '12345');
    return jwtDecoded.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const delRecipeServ = async (params, token) => {
  const { id } = params;
  const validProductId = validMongoId(id);
  if (!validProductId) return { status: INVALID_PRODUCT_ID };
  const verifiedToken = tokenValidation(token);
  if (!verifiedToken) return { status: 'missing auth token' };
  if (verifiedToken.role === 'admin') {
    const admDelRes = await handleAdminDeletion(id);
    return admDelRes;
  }
  const deletionRes = await handleUserDeletion(id, verifiedToken.id);
  return deletionRes;
}; 

module.exports = delRecipeServ;