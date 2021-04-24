const jwt = require('jsonwebtoken');

// const unauthorized = 401;
const secret = 'secretToken';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    // console.log(`validateToken variavel token: ${token}`);
    console.log(`validateToken variavel decoded: ${decoded}`);
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
