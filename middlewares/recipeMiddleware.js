const { ObjectId } = require('mongodb');
const {
  validIngredients,
  validName,
  validPreparation,
  status,
} = require('../helpers');

const dataRecipeInsertCheck = async (req, res, next) => {
  const { body: { name, ingredients, preparation } } = req;
  try {
    validName(name);
    validIngredients(ingredients);
    validPreparation(preparation);
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

const idExistCheck = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    if (!ObjectId.isValid(id) || !id) throw status.notFound;
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

const dataUpdateRecipeCheck = async (req, res, next) => {
  const { params: { id }, user, body } = req;
  const { name, ingredients, preparation } = body;
  const { data: { _id } } = user;

  try {
    if (!ObjectId.isValid(id) || !ObjectId.isValid(_id)) throw status.notFound;
    validName(name);
    validIngredients(ingredients);
    validPreparation(preparation);
    next();
  } catch (error) {
    return res.status(error.code).json(error.message);
  }
};

module.exports = {
  dataRecipeInsertCheck, idExistCheck, dataUpdateRecipeCheck };
