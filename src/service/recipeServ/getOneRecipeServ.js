const { getRecipeById } = require('../../model');
const { validMongoId } = require('../validation');
const { MISSING_DATA_IN_DB } = require('../servDictionary');

const getOneRecipeServ = async (id) => {
  if (!validMongoId(id)) {
    return { status: MISSING_DATA_IN_DB };
  }
  const recipe = await getRecipeById(id);
  return recipe
    ? { recipe, status: 'OK' }
    : { status: MISSING_DATA_IN_DB };
};

module.exports = getOneRecipeServ;