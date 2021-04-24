const Joi = require('joi');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');
const Recipe = require('../model/RecipeModel');

const JWT_SECRET = 'secret';

const {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  } = require('../exception');

const validateCreateUserMiddleware = (req, _res, next) => {
  const createUserSchemaRules = {
    name: Joi.string().empty('').required(),
    email: Joi.string().email().empty('').required(),
    password: Joi.string().min(6).empty('').required(),
};

const userSchema = Joi.object(createUserSchemaRules);
    const { error } = userSchema.validate(req.body);
    if (error) throw new BadRequestException('invalidEntries');
    next();
  };

  const validateLoginUserMiddleware = (req, _res, next) => {
    const loginUserSchemaRules = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  const userSchema = Joi.object(loginUserSchemaRules);
      const { error } = userSchema.validate(req.body);
      if (error) throw new UnauthorizedException('emptyFields');
      next();
    };

  const validateUniqueUserMiddleware = async (req, _res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findUser(email);
      if (user) throw new ConflictException('emailRegistered');
      next();
    } catch (err) {
      next(err);
    }
  };

  const validatePasswordMiddleware = async (req, _res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findUser(email);
      if (!user) throw new UnauthorizedException('invalidUser');
      // const isMatch = bcrypt.compareSync(password, user.password);
      const isMatch = password === user.password;
      if (!isMatch) throw new UnauthorizedException('invalidUser');
      const jwtConfig = {
        expiresIn: 3600 * 5,
        algorithm: 'HS256',
      };
      const token = jwt.sign({ data: user.email }, JWT_SECRET, jwtConfig);
      req.body.token = token;
      next();
    } catch (err) {
      next(err);
    }
  };

  const validateLoggedUserMiddleware = async (req, _res, next) => {
    try {
      const { id: recipeId } = req.params;
      const { _id: userId } = req.user;
      const recipe = await Recipe.findById(recipeId);
      const user = await User.findById(userId);
      if (!recipe) throw new BadRequestException('recipeNotFound');
      if (String(recipe.userId) !== String(userId) && user.role !== 'admin') {
          throw new UnauthorizedException('jwtMalformed');
      }
      next();
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    validateCreateUserMiddleware,
    validateLoginUserMiddleware,
    validatePasswordMiddleware,
    validateUniqueUserMiddleware,
    validateLoggedUserMiddleware,
  };
