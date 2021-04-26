const RecipeService = require('../services/RecipeService');

const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
    const recipe = await RecipeService.create(
        name, ingredients, preparation, authorization,
    );
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ Error: error.message });      
  }
};

const findAll = async (req, res) => {
  try {
    const recipes = await RecipeService.findAll();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ Error: error.message }); 
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeService.findById(id);

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ Error: error.message }); 
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await RecipeService
      .update(id, name, ingredients, preparation);

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ Error: error.message }); 
  }
};

const createImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req; 
    const image = `localhost:3000/images/${file.filename}`;
    const recipe = await RecipeService
      .createImage(id, image);

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ Error: error.message }); 
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    await RecipeService.exclude(id);

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ Error: error.message }); 
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  createImage,
  exclude,
};
