const rescue = require('express-rescue');
const { validation } = require('../../service');

module.exports = rescue(async (request, _res, next) => {
    const { name, ingredients, preparation } = request.body;
    validation.recipes.name(name);
    validation.recipes.preparation(ingredients);
    validation.recipes.ingredients(preparation);
    next();
});
