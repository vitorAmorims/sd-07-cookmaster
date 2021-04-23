const JWT = require('jsonwebtoken');
const multer = require('multer');
const { ObjectID } = require('mongodb');

const { usersModel, recipesModel } = require('../models');
const { UNAUTHORIZED, NOT_FOUND, SECRET } = require('../helpers');

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

const validateUserAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, userRole } = req;
    // console.log(userId);
    // console.log(userRole);

    if (!ObjectID.isValid(id) || !ObjectID.isValid(userId))
      return res.status(NOT_FOUND).json({ message: 'id Invalid' });

    const user = await usersModel.readById(userId);
    if (!user) throw new Error('userId did not registered');

    const recipe = await recipesModel.readById(id);
    if (!recipe) throw new Error('recipe did not registered');

    if (recipe.userId !== userId && userRole === 'user')
      throw new Error('user is not admin');

    next();
  } catch (error) {
    next({
      status: UNAUTHORIZED,
      message: error.message,
    });
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
