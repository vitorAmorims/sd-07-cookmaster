const { insertRecipe } = require('../../model/recipeModel');
const { preCheckFields } = require('../validation');

const insertRecipeServ = async (body) => {
  const mandatoryFields = ['name', 'ingredients', 'preparation'];
  const inputsInvalid = preCheckFields(body, mandatoryFields);
  console.log('INSERT_RECIPE_SERV LINE 7: ', body, inputsInvalid)
  if (inputsInvalid) {
    return inputsInvalid;
  }
  const [insertionRes] = await insertRecipe(body);
  return { recipe: insertionRes, status: 'Created' };
};

module.exports = insertRecipeServ;