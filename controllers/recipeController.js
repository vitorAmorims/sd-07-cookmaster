const service = require('../services/recipeService');

const createRecipe = async (request, response) => {
  try {
    const { name, ingredients, preparation } = request.body;
    const { user: { _id } } = request;
  
    const objectRecipe = { name, ingredients, preparation, userId: _id };

    const resultRecipe = await service.createRecipe(objectRecipe);

    return response
      .status(201)
      .json(resultRecipe);
  } catch (error) {
    return response.status(500).json({ message: 'Erro interno', error });
  }
};

const getAll = async (request, response) => response
.status(200).json(await service.getAllRecipes());

const findRecipeById = async (request, response) => {
  const { id } = request.params;
  response.status(200).json(await service.findRecipeById(id));
};

const updateRecipe = async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { user: { _id } } = request;
  const { id } = request.params;
  const objectRecipe = { name, ingredients, preparation, userId: _id };
  
  return response.status(200)
    .json(await service.updateRecipe(id, objectRecipe));
};

const deleteRecipe = async (request, response) => {
  const { id } = request.params;
  return response.status(204).json(await service.deleteRecipe(id));
};

const addImage = async (request, response) => {     
  const { id } = request.params;
  const { filename } = request.file;
  response.status(200).json(await service.addImage(id, filename));
};
 
module.exports = { 
  createRecipe,
  getAll,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  addImage,
};