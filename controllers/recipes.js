const modelRecipes = require('../models/recipes');

const serviceRecipes = require('../services/recipes');

const OK = 200;
const CREATE = 201;
const UNPROCESS = 422;
const ERROR = 400;
const ERRORBYID = 404;
const ERRORUPDATE = 401;
const CONFLICT = 409;
const objError = {
  err: {
    code: 'invalid_data',
    message: '',
  },
};

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
    res.status(ERROR).json({ message: error.message });
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
    const data = await modelRecipes.getById(id)
    if (!data) {
        ERR_MESSAGE = 'recipe not found'
        throw new Error(ERR_MESSAGE);
    }
    return response.status(OK).json(data);
  } catch (error) {
    // console.error(error);
    let { message } = error;
    if (message.includes('Argument passed in must be a single String')) {
        message = 'recipe not found';
        return response.status(ERRORBYID).json({ message: message });    
    }
    return response.status(ERRORBYID).json({ message: message });
  }
};

const putRecipe = async (request, response) => { 
  try {
    const { id } = request.params;

    const { _id } = request.user;
    
    const { name, ingredients, preparation } = request.body;

    const recipe = await modelRecipes.getById(id)
    
    const { userId } = recipe;

    if (String(userId) === String(_id) || String(request.user.role) === 'admin') {
      const data = await serviceRecipes.updateRecipe(
        recipe._id,
        name,
        ingredients,
        preparation
      );
      return response.status(OK).json(data);
    }
  } catch (error) {
    console.log(error);
    return response.status(ERRORUPDATE).json({message: error.message});
  }
};

const deleteRecipe = async (request, response) => {
  try {
    const OK = 204;
    const responseError = 401;

    const { id } = request.params;
  // console.log(id);

  const { _id } = request.user;
  // console.log(_id)

  const recipe = await modelRecipes.getById(id);
  const { userId } = recipe;
  // console.log(userId);

    if (String(userId) === String(_id) || String(request.user.role) === "admin") {
      const data = await serviceRecipes.deleteRecipe(id);
      return response.status(OK).json(data);
    }
  } catch (error) {
    console.log(error);
    return response.status(responseError).json({ message: message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipesById,
  postRecipe,
  putRecipe,
  deleteRecipe,
};
