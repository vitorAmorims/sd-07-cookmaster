const rescue = require('express-rescue');
const serviceForRecipe = require('../service/serviceForRecipe');
const decodeJwt = require('../helpers/decodeJwt');

const storage = serviceForRecipe.upload;

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

// const getFile = async (req, res) => {
//     const img = await serviceForRecipe.getFile(req.params.id);
//     res.status(200).json('http://localhost:300/'.concat(img));
// };

const create = rescue(async (req, res) => {
        const { name, ingredients, preparation } = req.body;
        const { authorization } = req.headers;
        const decoded = decodeJwt(authorization);
        const { _id } = decoded.payload.data;
      
        const recipe = await serviceForRecipe.create(name, ingredients, preparation, _id);
        const id = recipe.insertedId;
        return res.status(201)
        .json({ recipe: { name, ingredients, preparation, userId: _id, _id: id } });
});

const insertImg = async (req, res) => {
    const { id } = req.params;
    const LOCALHOST = 'localhost:3000/';
    const IMAGES = 'images/';

    const imageSet = IMAGES.concat(req.file.path.split('/')[1]);

    await serviceForRecipe.insertImg(id, LOCALHOST, imageSet);
    const recipe = await serviceForRecipe.getById(id);
    res.status(200).json(recipe);
};

const update = async (req, res) => {
    try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { userId } = await serviceForRecipe.getById(id);
  
    const recipe = await serviceForRecipe.update(id, name, ingredients, preparation);

    if (recipe.code) {
       return res.status(recipe.code).json({ message: recipe.message });
    }
    res.status(200).json({ _id: id, name, ingredients, preparation, userId });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
};

const exclude = async (req, res) => {
    const { id } = req.params;
   const recipe = await serviceForRecipe.exclude(id);

    if (recipe.code) {
        return res.status(recipe.code).json({ message: recipe.message });
    }
    res.status(204).send('No body returned for response');
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    exclude,
    insertImg,
    storage,
    // getFile,
};