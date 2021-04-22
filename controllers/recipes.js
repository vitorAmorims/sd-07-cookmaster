const modelRecipes = require('../models/recipes');

const serviceRecipes = require('../services/recipes');

const OK = 200;
const CREATE = 201;
const ERROR = 400;
const ERRORBYID = 404;
const ERRORUPDATE = 401;

const postRecipe = async (req, res) => {
  const { _id } = req.user;
  try {
    const { name, ingredients, preparation } = req.body;
    const result = await serviceRecipes.createRecipe(
      _id,
      name,
      ingredients,
      preparation,
    );

    return res.status(CREATE).json({ recipe: result });
  } catch (error) {
    console.error(error);

    const { message } = error;
    res.status(ERROR).json({ message });
  }
};

const getAllRecipes = async (request, response) => {
  try {
    const data = await serviceRecipes.getAllRecipes();
    // console.log(data);
    return response.status(OK).json(data);
  } catch (error) {
    console.error(error);
    return response.status(ERROR).json({ message: error.message });
  }
};

const getRecipesById = async (request, response) => {
  // console.log(request)
  try {
    const { id } = request.params;
    const data = await modelRecipes.getById(id);
    if (!data) {
      const ERR_MESSAGE = 'recipe not found';
      throw new Error(ERR_MESSAGE);
    }
    return response.status(OK).json(data);
  } catch (error) {
    // console.error(error);
    let { message } = error;
    if (message.includes('Argument passed in must be a single String')) {
      message = 'recipe not found';
      return response.status(ERRORBYID).json({ message });
    }
    return response.status(ERRORBYID).json({ message });
  }
};

const putRecipe = async (request, response) => {
  try {
    const { id } = request.params;
    const { _id } = request.user;
    const { name, ingredients, preparation } = request.body;
    const recipe = await modelRecipes.getById(id);
    const { userId, _id: idRecipe } = recipe;
    if (String(userId) === String(_id)
      || String(request.user.role) === 'admin') {
      const objParams = { _id, idRecipe, name, ingredients, preparation };
      const data = await serviceRecipes.updateRecipe(objParams);
      return response.status(OK).json(data);
    }
  } catch (error) {
    console.log(error);
    return response.status(ERRORUPDATE).json({ message: error.message });
  }
};

const deleteRecipe = async (request, response) => {
  const ERRORDELETE = 401;
  try {
    const DELETEOK = 204;
    const { id } = request.params;
    const { _id } = request.user;
    const recipe = await modelRecipes.getById(id);
    const { userId } = recipe;
    if (String(userId) === String(_id)
      || String(request.user.role) === 'admin') {
      const data = await serviceRecipes.deleteRecipe(id);
      return response.status(DELETEOK).json(data);
    }
  } catch (error) {
    console.log(error);
    const { message } = error;
    return response.status(ERRORDELETE).json({ message });
  }
};

const addImgRecipe = async (request, response) => {
  console.log(request);
  console.log('entrou aqui');
  response.status(200).send('show addImgRecipe');
};

module.exports = {
  getAllRecipes,
  getRecipesById,
  postRecipe,
  putRecipe,
  deleteRecipe,
  addImgRecipe,
};
