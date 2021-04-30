/** @format */

const {
  validatorMiddleware,
  validLoginMiddleware,
  validAdminMiddleware,
  AdminMiddleware,
} = require('./validatorMiddleware');
const { validRecipeMiddleware } = require('./validRecipeMiddleware');
const { errorMiddleware } = require('./errorMiddleware');
const { validToken } = require('./validTokenMiddleware');
const { multerMiddleware } = require('./multerMiddleware');

module.exports = {
  validatorMiddleware,
  validLoginMiddleware,
  multerMiddleware,
  validAdminMiddleware,
  errorMiddleware,
  validRecipeMiddleware,
  validToken,
  AdminMiddleware,
};
