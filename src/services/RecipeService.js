const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const { messageSuccess, messageFailure } = require('../../helpers/messageResponse');
const httpStatus = require('../../helpers/httpStatus');
const { validateToken } = require('../security/Authentication');

module.exports = {
  create: async (recipe, headers) => {
    const token = headers.authorization;
    const userByToken = validateToken(token);
    const user = await userModel.findByEmail(userByToken.user.email);
    if (!user) {
      return messageFailure('jwt malformed', httpStatus.UNAUTHORIZED);
    }
    const userCreated = await recipeModel.create(recipe);
    return messageSuccess(userCreated, httpStatus.CREATED);
  },
};