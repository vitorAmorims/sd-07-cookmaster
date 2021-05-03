const { ObjectID, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const userServeices = require('../service/userServices');
const recipeServeices = require('../service/recipeService');

const SUCESS = 200;
const CREATED = 201;
const DELETEDSUCESS = 204;
const FAIL = 400;

const createUser = async (req, res) => {
  try {
    // console.log('entro em controller');
    const { name, email, password } = req.body;
    const user = await userServeices.createUser(name, email, password);
    // console.log(user.ops[0]);
    // console.log('saiu de Controller');
    return res.status(CREATED).json({ user: user.ops[0] });
  } catch (error) {
    // console.log('ERRO em controller');
    return res.status(FAIL).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = 'senhaMuitoSecrataParaDecodificacao';

  try {
    const result = await userServeices.findByEmail(email);
    const payload = {
      email: result.email,
      role: result.role,
      id: ObjectID(result.id),
    };
    const token = jwt.sign(payload, secret);
    await userServeices.login(email, password);

    return res.status(SUCESS).json({ token });
  } catch (error) {
    return res.status(FAIL).json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    // console.log('entro em controller');
    const { name, ingredients, preparation } = req.body;
    const { id } = req.user;
    // console.log(req.user);
    // console.log(name);
    const recipes = await recipeServeices.createRecipe(name, ingredients, preparation, id);
    // console.log(recipe.ops[0]);
    // console.log('saiu de Controller');
    return res.status(CREATED).json({ recipe: recipes.ops[0] });
  } catch (error) {
    // console.log('ERRO em controller');
    return res.status(FAIL).json({ message: error.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const result = await recipeServeices.getRecipes();
    return res.status(SUCESS).json(result);
  } catch (error) {
    return res.status(FAIL).json({ message: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipeServeices.getRecipeById(id);
    return res.status(SUCESS).json(result);
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    await recipeServeices.updateRecipe(id, name, ingredients, preparation);
    return res.status(SUCESS).json({ id, name, ingredients, preparation, userId: ObjectId(id) });
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await recipeServeices.deleteRecipe(id);
    return res.status(DELETEDSUCESS).json();
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

const putImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req; 
    const urlImage = `localhost:3000/images/${file.filename}`;
    const result = await recipeServeices.putImage(id, urlImage);

    res.status(200).json(result);
  } catch (error) {
    return res.status(FAIL).json({ menssage: error.menssage });
  }
};

module.exports = {
  createUser,
  login,
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  putImage,
};
