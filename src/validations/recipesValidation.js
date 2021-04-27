const { recipesModel } = require('../models');

const validEntries = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    const error = new Error('Invalid entries. Try again.');
    error.statusCode = 'bad_request';
    throw error;
  }
};

const validID = async (id) => {
  const minLengthID = 24;
  if (typeof id !== 'string' || id.length < minLengthID) {
    const error = new Error('recipe not found');
    error.statusCode = 'not_found';
    throw error;
  }
};

const existID = async (id) => {
  validID(id);
  const idVerify = await recipesModel.getByID(id);
  if (!idVerify) {
    const error = new Error('recipe not found');
    error.statusCode = 'not_found';
    throw error;
  }
  return idVerify;
};

module.exports = {
  validEntries,
  existID,
  validID,
};