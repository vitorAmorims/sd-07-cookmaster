const JWT = require('jsonwebtoken');
const multer = require('multer');
const { ObjectID } = require('mongodb');

const { usersModel, recipesModel } = require('../models');
const { UNAUTHORIZED, NOT_FOUND, SECRET, throwError } = require('../helpers');

const validateToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('missing auth token');

    const decodedJWT = JWT.verify(authorization, SECRET);
    if (!decodedJWT) throw new Error('jwt malformed');
    // console.log(decodedJWT);

    const { _id, role } = decodedJWT;
    req.userId = _id;
    req.userRole = role;
    next();
  } catch (error) {
    next({
      status: UNAUTHORIZED,
      message: error.message,
    });
  }
};

const validateUserAuthorization = async (req, _res, next) => {
  try {
    const { id } = req.params;
    const { userId, userRole } = req;
    throwError(!ObjectID.isValid(id) || !ObjectID.isValid(userId), null,
      { status: NOT_FOUND, message: 'id Invalid' });
    const user = await usersModel.readById(userId);
    throwError(!user, 'userId did not registered', null);
    const recipe = await recipesModel.readById(id);
    throwError(!recipe, 'recipe did not registered', null);
    throwError(recipe.userId !== userId && userRole === 'user', 'user is not admin', null);
    next();
  } catch (error) {
    if (error.code) {
      return next({ status: error.code.status, message: error.code.message });
    }
    next({ status: UNAUTHORIZED, message: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    console.log(file);
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = {
  validateToken,
  validateUserAuthorization,
  upload,
};
