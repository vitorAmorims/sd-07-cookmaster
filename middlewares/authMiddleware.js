const { validateToken } = require('../auth');

// Como visto no plantão do Cristiano Cunha no dia 22-04-2021
const checkIfTheUserIsAuthenticated = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) {
    return response.status(401).send({ message: 'missing auth token' });
  }

  if (validateToken.tokenIsValid(token)) {
    return next();
  }

  return response.status(401).send({ message: 'jwt malformed' });
};

module.exports = {
  checkIfTheUserIsAuthenticated,
};