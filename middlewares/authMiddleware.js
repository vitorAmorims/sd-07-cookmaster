const { ServicesToken } = require('../services');
const { status } = require('../helpers');

// const checkRouteToReturn = (route, error) => {
//   console.log(`Console Switch: ${route}==>${Object.assign(error)} `);
//   switch (route) {
//     case '/recipes/:id':
//       return status.invalidTokenUpdateRecipe;
//     case '/recipes/:id/image' && error === 'JsonWebTokenError: invalid token':
//       return status.invalidTokenUpdateRecipe;
//     default:
//       return status.invalidToken;
//   }
// };

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const { route: { path } } = req;
  try {
    const result = ServicesToken.verifyToken(token);
    req.user = result;
    next();
  } catch (error) {
    if (!token && path === '/recipes/:id') {
      return res
      .status(status.invalidTokenUpdateRecipe.code)
        .json(status.invalidTokenUpdateRecipe.message);
    }
    return res.status(status.invalidToken.code).json(status.invalidToken.message); 
  }
};

module.exports = authMiddleware;
