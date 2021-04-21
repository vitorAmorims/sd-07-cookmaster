const jwt = require('../helper/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const error = jwt.decodeToken(authorization);
  if (!authorization || !error) {
    return res.status(401)
        .send({ message: 'jwt malformed' }); 
  }
  
  next();
};
