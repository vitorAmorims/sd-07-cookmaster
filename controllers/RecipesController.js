const fs = require('fs').promises;
const recipeService = require('../services/RecipesService');
const recipeModel = require('../models/Recipes');
const errorMsg = require('../utils/errorMsg');

const add = async (req, res) => {
  try {    
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const newRecipe = await recipeService.add(name, ingredients, preparation, authorization);
    
    return res.status(201).json({ recipe: newRecipe });
  } catch (error) {    
    res.status(500).json({ message: errorMsg }); 
  }  
};

const listAll = async (_req, res) => {
  try {
    const allRecipes = await recipeModel.getAll();
    
    return res.status(200).json(allRecipes);
  } catch (error) {
    res.status(500).json({ message: errorMsg }); 
  }
};

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const recipe = await recipeModel.getById(id);    
    // console.log(recipe);
    if (!recipe) {
       return res.status(404).json({ message: 'recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: errorMsg }); 
  }  
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    
    const recipe = await recipeModel.update(id, name, ingredients, preparation);

    return res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: errorMsg }); 
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await recipeModel.remove(id);

    return res.status(204).send(removed);
  } catch (error) {
    res.status(500).json({ message: errorMsg }); 
  }
};

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const path = `localhost:3000/images/${id}.jpeg`;

    const recipe = await recipeService.updateWithImage(id, path);

    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).json({ message: errorMsg });     
  }
};

// Um oferecimento Stackoverflow
// https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs
const getImage = async (req, res) => {
  const { id } = req.params;
  const image = await fs.readFile(`${__dirname}/../images/${id}`);
  
  res.writeHead('200', { 'Content-type': 'image/jpeg' });
  res.end(image, 'binary');
};

module.exports = {
  add,
  listAll,
  getRecipe,
  update,
  remove,
  addImage,
  getImage,
};