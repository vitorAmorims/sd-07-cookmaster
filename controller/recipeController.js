const recipeService = require('../service/recipeService');
const jwt = require('../helper/jwt');

const create = async (req, res) => {
  const { name, preparation, ingredients } = req.body;
  const { authorization } = req.headers;
  const decoded = await jwt.decodeToken(authorization);

  if (!preparation || !ingredients || !name) {
    return res.status(400).send({ message: 'Invalid Entries. Try again.' }); 
  }
  const recipe = await recipeService.create(decoded.id, name, preparation, ingredients);
  return res.status(201).send({ recipe });
};

const getAll = async (req, res) => {
  const resposta = await recipeService.getAll();
  return res.status(200).send(resposta);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const resposta = await recipeService.getById(id);
  if (!resposta) return res.status(404).send({ message: 'recipe not found' });
  return res.status(200).send(resposta);
};

const checkEntries = (preparation, ingredients, name) => {
  if (!preparation || !ingredients || !name) {
    return false; 
  }
  return true;
};

const editById = async (req, res) => {
  const { name, preparation, ingredients } = req.body;
  const { id } = req.params;
  const { authorization } = req.headers;
  if (!authorization) { return res.status(401).send({ message: 'missing auth token' }); }

  const error = jwt.decodeToken(authorization);
  if (!error) { return res.status(401).send({ message: 'jwt malformed' }); }

  const EntriesOK = checkEntries(preparation, ingredients, name);
  if (!EntriesOK) {
    return res.status(400).send({ message: 'Invalid Entries. Try again.' }); 
  }
  const recipe = await recipeService.editById(id, name, preparation, ingredients);
  return res.status(200).send(recipe);
};

module.exports = { create, getAll, getById, editById };