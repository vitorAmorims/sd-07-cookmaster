const { ServicesToken } = require('../services');
const { status } = require('../helpers');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const result = ServicesToken.verifyToken(token);
    req.user = result;
    next();
  } catch (error) {
    const { route: { path } } = req;
    if (path === '/recipes/:id' && !token) {
      return res
      .status(status.invalidTokenUpdateRecipe.code)
        .json(status.invalidTokenUpdateRecipe.message);
    }
    return res.status(status.invalidToken.code).json(status.invalidToken.message); 
  }
};

module.exports = authMiddleware;
