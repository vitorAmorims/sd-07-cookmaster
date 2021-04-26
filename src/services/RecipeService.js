const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const { messageSuccess, messageFailure } = require('../../helpers/messageResponse');
const httpStatus = require('../../helpers/httpStatus');
const { validateToken } = require('../security/Authentication');

module.exports = {
  create: async (recipe, headers) => {
    const token = headers.authorization;

    const { user, user: { _id } } = validateToken(token);

    const userByEmail = await userModel.findByEmail(user.email);
    if (!userByEmail) {
      throw messageFailure('jwt malformed', httpStatus.UNAUTHORIZED);
    }

    const { name, ingredients, preparation } = recipe;
    const recipeCreated = await recipeModel.create({
      name, ingredients, preparation, userId: _id,
    });

    return messageSuccess(recipeCreated, httpStatus.CREATED);
  },
};