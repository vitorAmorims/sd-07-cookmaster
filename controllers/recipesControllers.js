// const { validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const recipesService = require('../service/recipesService');
const message = require('../helpers/message.json');

const getAll = async (req, res) => {
    const recipes = await recipesService.getAll();
    res.status(200).json(recipes);
  };

const findByid = async (req, res) => {
 const { id } = req.params;
 if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: message.recipeNotFound });
 }
 const idRecipes = await recipesService.findByid(id);
 if (!idRecipes) {
     return res.status(404).json({ message: message.recipeNotFound });
 }

 res.status(200).json(idRecipes);
};

const updateRecipes = async (req, res) => {
    // const { user } = req;
    // console.log(user);
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const recipe = await recipesService.updateRecipes(id, name, ingredients, preparation);
    console.log(recipe);
    if (!recipe) return res.status(401).json({ message: 'missing auth token' });
    res.status(200).json({ _id: id, name, ingredients, preparation });
};

const recipes = async (req, res) => {
    const { _id } = req.user;
    
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
        return res.status(400).json({ message: message.invalid_entries });
    }
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //    return res.status(400).json({ message: message.invalid_entries });
    // }
    const result = await recipesService.recipes(name, ingredients, preparation, _id);

    res.status(201).json({ recipe: result });
    return result;
};

const deleteRecipes = async (req, res) => {
    const { id } = req.params;
    const deleteRecipe = await recipesService.deleteRecipes(id);
    res.status(204).json(deleteRecipe);
  };

const editUpload = async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    console.log('id', id);
    console.log('filename', filename);
    const result = await recipesService.editUpload(id, filename);
    console.log(result, 'controler');
    res.status(200).json(result);
};

module.exports = {
    getAll,
    findByid,
    recipes,
    updateRecipes,
    deleteRecipes,
    editUpload,
};
