const Joi = require('joi');
const jwt = require('jsonwebtoken');

const User = require('../model/UserModel');
const { UnauthorizedException, BadRequestException } = require('../exception');

const JWT_SECRET = 'secret';

const validateTokenMiddleware = async (req, _res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) throw new UnauthorizedException('missingToken');
        const decoded = jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
            if (err) throw new UnauthorizedException('jwtMalformed');
            return decodedJwt;
        });
        const user = await User.findUser(decoded.data);
        if (!user) throw new UnauthorizedException('jwtMalformed');
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

const validateCreateRecipeMiddleware = (req, _res, next) => {
    const createRecipeSchemaRules = {
    name: Joi.string().empty('').required(),
    ingredients: Joi.string().empty('').required(),
    preparation: Joi.string().empty('').required(),
  };

  const recipeSchema = Joi.object(createRecipeSchemaRules);
      const { error } = recipeSchema.validate(req.body);
      if (error) throw new BadRequestException('invalidEntries');
      next();
    };

module.exports = {
    validateTokenMiddleware,
    validateCreateRecipeMiddleware,
};