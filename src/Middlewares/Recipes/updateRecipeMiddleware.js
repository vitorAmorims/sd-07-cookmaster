const { getRecipeById } = require('../../Models/Recipes/getRecipeById');

const CODE_TOKEN_ERROR = 401;
const NOT_FOUND = 404;
const INVALID_TOKEN = 'jwt malformed';
const MISSING_TOKEN = 'missing auth token';
const REGEX_TOKEN = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

const validationToken = (token) => {
    if (!REGEX_TOKEN.test(token)) {
        return true;
      }
};

const updateRecipeMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const { authorization } = req.headers;

    const recipe = await getRecipeById(id);
     if (!recipe) {
       return res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
    if (!authorization) {
       return res.status(CODE_TOKEN_ERROR).json({ message: MISSING_TOKEN });
    }
    if (validationToken(authorization)) {
       return res.status(CODE_TOKEN_ERROR).json({ message: INVALID_TOKEN });
    }
    next();
};   

module.exports = {
    updateRecipeMiddleware,
};