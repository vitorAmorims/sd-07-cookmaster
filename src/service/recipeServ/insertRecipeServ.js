require('dotenv');
const jwt = require('jsonwebtoken');
const { insertRecipe } = require('../../model');
const { preCheckFields } = require('../validation');

const insertRecipeServ = async (body, token) => {
  const mandatoryFields = ['name', 'ingredients', 'preparation'];
  const inputsInvalid = preCheckFields(body, mandatoryFields);
  if (inputsInvalid) {
    return inputsInvalid;
  }
  const { id } = jwt.verify(token, process.env.SECRET).data;
  console.log(id);
  const [insertionRes] = await insertRecipe(body, id);
  return { recipe: insertionRes, status: 'Created' };
};

module.exports = insertRecipeServ;