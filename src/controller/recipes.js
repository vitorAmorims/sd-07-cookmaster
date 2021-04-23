const services = require('../service/recipes');
const model = require('../model/recipes');

const newR = async (req, res) => {
  console.log('recipe: ', req.user, req.body);
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const resp = await services.newRecipe(
    name,
    ingredients,
    preparation,
    _id,
  );
  res.status(resp.status ? resp.status : 201).json(resp);
};

const list = async (_req, res) => {
  model.listRecipes().then((resp) => res.json(resp));
};

const listById = async (req, res) => {
  const { id } = req.params;
  model.listRecipesById(id).then((resp) => {
    if (!resp) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    res.json(resp);
  });
};

const edit = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const resp = await services.editRecipe(
    { userId, role },
    { name, ingredients, preparation, id },
  );

  res.status(resp.status ? resp.status : 200).json(resp);
};

const deleted = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { id } = req.params;

  const resp = await services.deleteRecipe(
    { userId, role },
    id,
  );

  res.status(resp.status ? resp.status : 204).json(resp);
};

module.exports = { newR, list, listById, edit, deleted };
