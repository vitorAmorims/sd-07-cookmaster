const { add, getAll, getById, update, exclude, updateImage } = require('../models/recipesModel');
const {
  UNAUTHORIZED_401,
  CREATED_201, 
  OK_200, 
  NOT_FOUND_404, 
  NO_CONTENT_204 } = require('../util');

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: id } = req.user;

    const recipe = await add(name, ingredients, preparation, id);

    return res.status(CREATED_201).json({ recipe });
  } catch (err) {
    console.error(err.message);
    return res.status(UNAUTHORIZED_401).send({ message: 'Incorrect username or password' });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAll();

    return res.status(OK_200).json(recipes);
  } catch (err) {
    console.error(err.message);
    return res.status(UNAUTHORIZED_401).send({ message: 'Incorrect username or password' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await getById(id);
    if (!recipe) {
      throw new Error();
    }
    return res.status(OK_200).json(recipe);
  } catch (err) {
    console.error(err.message);
    return res.status(NOT_FOUND_404).send({ message: 'recipe not found' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { user: { _id: idUser }, body } = req;
    const { name, ingredients, preparation } = body;
    const { id } = req.params;
    const newRecipe = { id, name, ingredients, preparation, idUser };

    const result = await update(newRecipe);

    return res.status(OK_200).json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(NOT_FOUND_404).send({ message: 'recipe not found' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await exclude(req.params.id);
    return res.status(NO_CONTENT_204).end();
  } catch (err) {
    console.error(err.message);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await getById(id);
    if (!recipe) {
      throw new Error();
    }
    const { _id, name, ingredients, preparation, userId } = recipe;
    const image = `localhost:3000/images/${id}.jpeg`;

    await updateImage(id, image);

    return res.status(OK_200).json({ _id, name, ingredients, preparation, userId, image });
  } catch (err) {
    console.error(err.message);
    return res.status(UNAUTHORIZED_401).send({ message: 'erro ao enviar a imagem' });
  }
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};
