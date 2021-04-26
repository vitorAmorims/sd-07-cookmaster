const jwt = require('jsonwebtoken');

const SECRET_PASS = 'marcelodossantos';
// sconst sizeToken = 225;

const jwtValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'missing auth token' });
    }
      const { email } = jwt.verify(authorization, SECRET_PASS);
    
      if (!email) {
        return res.status(401).json({ message: 'missing auth token' });
      }
      
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });      
  }
};

module.exports = jwtValidation;