const { ObjectId } = require('mongodb');
const { getById } = require('../models/recipesModel');
const { update } = require('../models/recipesModel');

/** Se não tem usuario logado return -1
 * Se o usuario logado for o criador da receita retorna 1
 * se o usuario logado for o administrador 2
 * Se o usuario logado não for administrador ou o criador retorna 0
 */
const userAuthorization = (user, userId) => {
  if (!user) return -1;

  const { _id: idUser, role } = user;
  let isRole = 0;

  isRole = ObjectId(idUser).equals(ObjectId(userId)) ? 1 : 0;
  if (isRole === 0 && role === 'admin') {
    isRole = 2;
  }
  return isRole;
};

const updateRecipeService = async (user, idReq, data) => {
  const recipe = await getById(idReq);
  const { userId } = recipe;
  const { name, ingredients, preparation } = data;
  const isAuthorization = userAuthorization(user, userId);

  if (isAuthorization <= 0) {
    return isAuthorization;
  }
  const newRecipe = { idReq, name, ingredients, preparation, userId };
  
  const result = await update(newRecipe);
  console.log(result);
  return result;
};

module.exports = {
  updateRecipeService,
};
