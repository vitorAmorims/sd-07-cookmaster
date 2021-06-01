const jwt = require('jsonwebtoken');
const { code400, code401, message, encryptSecret } = require('../utils/dictionary');

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

const addValidations = [
  validatingFields,
  validatingToken,
];

module.exports = {
  validatingFields,
  validatingToken,
  addValidations,
};
