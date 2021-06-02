const { ObjectId } = require('mongodb');

const notFound = 'recipe not found';

const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const { messageSuccess, messageFailure } = require('../helpers/messageResponse');
const httpStatus = require('../helpers/httpStatus');
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
      return messageFailure(notFound, httpStatus.NOT_FOUND);
    }
    const recipeById = await recipeModel.getById(id);
    if (!recipeById) {
      return messageFailure(notFound, httpStatus.NOT_FOUND);
    }
    const { _id, name, ingredients, preparation, userId } = recipeById;
    return messageSuccess({ _id, name, ingredients, preparation, userId }, httpStatus.OK);
  },
  async update(recipe, headers, id) {
    const token = headers.authorization;
    const { user } = validateToken(token);
    const userByEmail = await userModel.findByEmail(user.email);
    if (!userByEmail) {
      return messageFailure('jwt malformed', httpStatus.UNAUTHORIZED);
    }
    let recipeById = await recipeModel.getById(id);
    if (!recipeById) {
      return messageFailure('recipe not found', httpStatus.NOT_FOUND);
    }
    const { name, ingredients, preparation } = recipe;
    const recipeUpdated = await recipeModel.update({
      name, ingredients, preparation,
    }, id);
    if (recipeUpdated) {
      recipeById = await recipeModel.getById(id);
    }
    return messageSuccess(recipeById, httpStatus.OK);
  },
  async delete(id, headers) {
    const token = headers.authorization;
    const { user } = validateToken(token);
    const recipeById = await recipeModel.getById(id);
    const { _id } = user;
    if (recipeById.userId === _id || user.role === 'admin') {
      await recipeModel.delete(id);
      return messageSuccess({}, httpStatus.NO_CONTENT);
    }
    return messageFailure('Não foi possivel criar', httpStatus.BAD_REQUEST);
  },
};
