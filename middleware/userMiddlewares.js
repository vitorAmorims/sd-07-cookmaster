const Joi = require('joi');
const { findUser } = require('../model/UserModel');

const {
  BadRequestException,
  ConflictException,
  } = require('../exception');

exports.validateUserMiddleware = (req, _res, next) => {
  const userSchemaRules = {
    name: Joi.string().empty('').required(),
    email: Joi.string().email().empty('').required(),
    password: Joi.string().min(6).empty('').required(),
};
const schema = Joi.object(userSchemaRules);
    const { error } = schema.validate(req.body);
    if (error) throw new BadRequestException('invalidEntries');
    next();
  };

  exports.validateUniqueUserMiddleware = async (req, _res, next) => {
    try {
      const { email } = req.body;
      const user = await findUser(email);
      if (user) throw new ConflictException('emailRegistered');
      next();
    } catch (err) {
      next(err);
    }
  };
