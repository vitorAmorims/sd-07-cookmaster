const CODES = require('../configurations/statusCodes');
const Models = require('../models');
const CustomError = require('../helpers/customError');

const getImageByName = async (name) => {
  // if (!AuthValidations.isIdValid(id)) {
  //   throw new CustomError(CODES.NOTFOUND, NOT_FOUND_MESSAGE);
  // }
  try {
    return await Models.getImageByName(name);
  } catch (error) {
    throw new CustomError(CODES.NOTFOUND, 'image not found');
  }
};

module.exports = { getImageByName };
