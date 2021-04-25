const rescue = require('express-rescue');
const serviceForRecipe = require('../service/serviceForRecipe');
const decodeJwt = require('../helpers/decodeJwt');

const getAll = async (_req, res) => {
    const recipes = await serviceForRecipe.getAll();
    res.status(200).json(recipes);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const recipe = await serviceForRecipe.getById(id);
    if (recipe.code) {
        return res.status(recipe.code).json({ message: recipe.message });
    }
    res.status(200).json(recipe);
};

const create = rescue(async (req, res) => {
        const { name, ingredients, preparation } = req.body;
        const { token } = req.headers;
        const decoded = decodeJwt(token);
        const { _id } = decoded.payload.data;
        // const errors = validationResult(req);
        
        // if (!errors.isEmpty()) {
        //     return res.status(code.Bad_Request).json({ message: 'Invalid entries. Try again.' });
        // }
      
        const recipe = await serviceForRecipe.create(name, ingredients, preparation, _id);
        const id = recipe.insertedId;
        return res.status(201)
        .json({ recipe: { name, ingredients, preparation, userId: _id, _id: id } });
});

const update = async (req, res) => {
    try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { userId } = await serviceForRecipe.getById(id);
  
    const recipe = await serviceForRecipe.update(id, name, ingredients, preparation);

    if (recipe.code) {
        res.status(recipe.code).json({ message: recipe.message });
    }
    res.status(201).json({ _id: id, name, ingredients, preparation, userId });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// const exclude = async (req, res) => {
//     const { id } = req.params;
//     const { role } = await serviceForRecipe.getById(id);
// };

module.exports = {
    create,
    getAll,
    getById,
    update,
    // exclude,
};