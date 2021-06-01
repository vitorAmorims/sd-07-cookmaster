const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { code400, code404, code401, message, encryptSecret } = require('../utils/dictionary');

const validatingFields = (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return response.status(code400).json({ message: message.tryAgain });
  }
  next();
};

const validatingToken = (request, response, next) => {
  try {
    const { authorization } = request.headers;
    jwt.verify(authorization, encryptSecret);
    next();
  } catch (error) {
    return response.status(code401).send({ message: message.tokenError });
  }
};

const validatingAuth = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(code401).send({ message: message.missingAuth });
  }

  next();
};

const validatingId = (request, response, next) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) {
    return response.status(code404).send({ message: message.noRecipe });
  }

  next();
};

const addValidations = [
  validatingFields,
  validatingToken,
];

const updateValidation = [
  validatingAuth,
  validatingToken,
];

module.exports = {
  validatingFields,
  validatingToken,
  addValidations,
  validatingId,
  updateValidation,
  validatingAuth,
};
