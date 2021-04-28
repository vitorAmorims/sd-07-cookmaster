const jwt = require('jsonwebtoken');

const unauthorized = 401;
const secret = 'secretToken';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(unauthorized).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    // cadê a logica de validação? esse verify já retorna um erro que é pego no catch? é isso né?
    // console.log(`validateToken variavel token: ${token}`);
    console.log(`validateToken variavel decoded: ${decoded}`);
    next();
  } catch (error) {
    return res.status(unauthorized).json({ message: error.message });
  }
};

module.exports = validateToken;
