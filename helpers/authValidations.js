const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const Models = require('../models');
const CustomError = require('./customError');

const CODES = require('../configurations/statusCodes');

const { SECRET } = process.env;

const isIdValid = (id) => {
  if (!ObjectId.isValid(id)) return false;
  return true;
};

const generateToken = (dataObject) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(dataObject, SECRET, jwtConfig);
};

const validateToken = async (token) => {
  if (!token) throw new Error();
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await Models.getByEmailAndPassword(decoded.email, decoded.password);
    if (!user) throw new Error();
    return user;
  } catch (err) {
    throw new Error();
  }
};

const recipeOwner = async (role, recipeId, userId1) => {
  if (role === 'admin' || !recipeId) return true;
  // if (!recipeId) return user;
  const { userId } = await Models.getUserIdByRecipeId(recipeId);
  if (JSON.stringify(userId1) === JSON.stringify(userId)) return true;
  return false;
};

const userAutorization = async (auth, recipeId = null) => {
  if (!auth) throw new CustomError(CODES.UNAUTHORIZED, 'missing auth token');
  let user;
  try {
    user = await validateToken(auth);
  } catch (e) {
    throw new CustomError(CODES.UNAUTHORIZED, 'jwt malformed');
  }
  if (recipeOwner(user.role, recipeId, user.userId)) return user;
    
  throw new CustomError(
    CODES.UNAUTHORIZED,
    'This recipe is not yours. You can only delete your own recipes',
  );
};

module.exports = {
  generateToken,
  validateToken,
  userAutorization,
  isIdValid,
};
