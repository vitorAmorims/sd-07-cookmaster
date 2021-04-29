const jwt = require('jsonwebtoken');
const { addRecipe } = require('../../Models/Recipes/addRecipe');
const { getUserByEmail } = require('../../Models/Users/getUserByEmail');
// require('dotenv').config();

// Secret for remote test
const SECRET_PASS = 'minhasenhamuitosegura';

const decode = async (token) => {
    const result = jwt.verify(token, SECRET_PASS);
    const userId = await getUserByEmail(result.data);
    const { _id } = userId;
    return _id;
};

const addRecipeController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;

    const user = await decode(authorization);

    addRecipe(name, ingredients, preparation, user)
    .then((result) => res.status(201).json(result))
    .catch((err) => console.log(err));
};

module.exports = {
    addRecipeController,
};