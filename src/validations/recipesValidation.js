const { ObjectId } = require('mongodb');
const { recipesModel } = require('../models');

const validEntries = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    const error = new Error('Invalid entries. Try again.');
    error.statusCode = 'bad_request';
    throw error;
  }
};

const validID = async (id) => {
  if (!ObjectId.isValid(id)) {
    const error = new Error('recipe not found');
    error.statusCode = 'not_found';
    throw error;
  }
};

const existID = async (id) => {
  await validID(id);
  const idVerify = await recipesModel.getByID(id);
  if (!idVerify) {
    const error = new Error('recipe not found');
    error.statusCode = 'not_found';
    throw error;
  }
  return idVerify;
};

// const matchIDs = (validID, user) => {
//   const { _id } = user;
//   if (validID.userID !== _id) {

//   }
// };

// const checkToken = async (token) => {
//   const validToken = await verifyToken(token);
//   if (!validToken) {
//     const error = new Error('recipe not found');
//     error.statusCode = 'not_found';
//     throw error;
//   }
// };

module.exports = {
  validEntries,
  existID,
  validID,
};