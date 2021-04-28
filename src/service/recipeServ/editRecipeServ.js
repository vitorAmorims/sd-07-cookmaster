require('dotenv');
const jwt = require('jsonwebtoken');
const { preCheckFields, validMongoId } = require('../validation');
const { updateRecipe } = require('../../model');
const { INVALID_PRODUCT_ID } = require('../servDictionary');

const editRecipeServ = async (body, params, token) => {
  const { id } = params;
  const validProductId = validMongoId(id);
  if (!validProductId) return { status: INVALID_PRODUCT_ID };
  const MANDATORY_FIELDS = ['name', 'ingredients', 'preparation'];
  const inputsInvalid = preCheckFields(body, MANDATORY_FIELDS);
  if (inputsInvalid) return inputsInvalid;
  // {status: BAD_INPUT};
  const userId = jwt.verify(token, process.env.SECRET || '12345').data.id;
  const editionRes = updateRecipe(body, userId, id);
  return editionRes.err
    ? editionRes
    : { status: 'OK', editionRes: body };
};

module.exports = editRecipeServ;
