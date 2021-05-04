// const { validationResult } = require('express-validator');
const recipesService = require('../service/recipesService');
const message = require('../helpers/message.json');

const getAll = async (req, res) => {
    const recipes = await recipesService.getAll();
    res.status(200).json(recipes);
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
    recipes,
};