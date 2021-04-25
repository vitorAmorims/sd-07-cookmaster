const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const recipeModel = require('../models/recipeModel');

const secret = 'minhaSenhaUltraSecreta';

const createNewRecipe = rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, secret);
    return decoded;
});

module.exports = {
    createNewRecipe,
};
