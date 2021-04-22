const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

const JWT_SECRET = 'secret';

const {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  } = require('../exception');

exports.validateCreateUserMiddleware = (req, _res, next) => {
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

  exports.validateLoginUserMiddleware = (req, _res, next) => {
    const loginUserSchemaRules = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  const userSchema = Joi.object(loginUserSchemaRules);
      const { error } = userSchema.validate(req.body);
      if (error) throw new UnauthorizedException('emptyFields');
      next();
    };

  exports.validateUniqueUserMiddleware = async (req, _res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findUser(email);
      if (user) throw new ConflictException('emailRegistered');
      next();
    } catch (err) {
      next(err);
    }
  };

  exports.validatePasswordMiddleware = async (req, _res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findUser(email);
      if (!user) throw new UnauthorizedException('invalidUser');
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) throw new UnauthorizedException('invalidUser');
      const jwtConfig = {
        expiresIn: 60 * 5,
        algorithm: 'HS256',
      };
      const token = jwt.sign({ data: user.username }, JWT_SECRET, jwtConfig);
      req.body.token = token;
      next();
    } catch (err) {
      next(err);
    }
  };
