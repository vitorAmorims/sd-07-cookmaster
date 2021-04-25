const { ApiStatusCode, Errors } = require('../enums');
const { validationSchema } = require('../schemas');

const generateToken = async (req, res, next) => {
  const { email, password } = req.body;
  const { UNAUTHORIZED } = ApiStatusCode;
  const { WRONG_FORMAT } = Errors;
  
  if (!email) return res.status(UNAUTHORIZED).json({ message: Errors.UNAUTHORIZED });
  if (!password) return res.status(UNAUTHORIZED).json({ message: Errors.UNAUTHORIZED });
  if (!validationSchema.isEmailValid(email)) {
    return res.status(ApiStatusCode.UNAUTHORIZED).json({ message: WRONG_FORMAT });
  }

  next();
};

const generateTokenStep2 = async (req, res, next) => {
  const { email, password } = req.body;
  const { UNAUTHORIZED } = ApiStatusCode;
  const { WRONG_FORMAT } = Errors;

  const userFound = await validationSchema.getUser(email);

  if (!userFound) return res.status(UNAUTHORIZED).json({ message: WRONG_FORMAT });
 
  const isMatch = password === userFound.password;

  if (!isMatch) return res.status(UNAUTHORIZED).json({ message: WRONG_FORMAT });

  req.body = userFound;

  next();
};

const validateToken = async (req, res, next) => {
  const { body } = req;
  const token = req.headers.authorization;
  const { UNAUTHORIZED } = ApiStatusCode;
  const { INVALID_TOKEN } = Errors;
  if (!token) return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });

  const user = validationSchema.validateToken(token);
  const { _id } = user;
  if (!_id) return res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN });
  
  req.body = { ...body, userId: _id };

  next();
};

const validateTokenUpdating = async (req, res, next) => {
  const { body } = req;
  const token = req.headers.authorization;
  if (!token) return res.status(ApiStatusCode.UNAUTHORIZED).json({ message: Errors.MISSING_TOKEN });

  const user = validationSchema.validateToken(token);
  const { _id } = user;
  if (!_id) return res.status(ApiStatusCode.UNAUTHORIZED).json({ message: Errors.INVALID_TOKEN });
  
  req.body = { ...body, userId: _id };

  next();
};

// const isAdmin = async (req, res, next) => {
//   const { email }
// }

module.exports = {
  generateToken,
  generateTokenStep2,
  validateToken,
  validateTokenUpdating,
};