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

const recipes = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    if (!name || !ingredients || !preparation) {
        return res.status(400).json({ message: message.invalid_entries });
    }
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //    return res.status(400).json({ message: message.invalid_entries });
    // }
    const result = await recipesService.recipes(name, ingredients, preparation);

    res.status(201).json({ recipe: { name, ingredients, preparation } });
    return result;
};

module.exports = {
    getAll,
    findByid,
    recipes,
};