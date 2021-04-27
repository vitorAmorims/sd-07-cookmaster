const { ObjectId } = require('mongodb');

const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const { messageSuccess, messageFailure } = require('../../helpers/messageResponse');
const httpStatus = require('../../helpers/httpStatus');
const { validateToken } = require('../security/Authentication');

module.exports = {
  async create(recipe, headers) {
    const token = headers.authorization;

    const { user, user: { _id } } = validateToken(token);

    const userByEmail = await userModel.findByEmail(user.email);
    if (!userByEmail) {
      return messageFailure('jwt malformed', httpStatus.UNAUTHORIZED);
    }

    const { name, ingredients, preparation } = recipe;
    const recipeCreated = await recipeModel.create({
      name, ingredients, preparation, userId: _id,
    });

    return messageSuccess(recipeCreated, httpStatus.CREATED);
  },
  async getAll() {
    const recipes = await recipeModel.getAll();
    return messageSuccess(recipes, httpStatus.OK);
  },
  async getById(id) {
    if (!ObjectId.isValid(id)) {
      return messageFailure('recipe not found', httpStatus.NOT_FOUND);
    }
    const recipeById = await recipeModel.getById(id);
    if (!recipeById) {
      return messageFailure('recipe not found', httpStatus.NOT_FOUND);
    }
    const { _id, name, ingredients, preparation, userId } = recipeById;
    return messageSuccess({ _id, name, ingredients, preparation, userId }, httpStatus.OK);
  },
};