const jwt = require('jsonwebtoken');

const secret = 'abc';

const generateAuthToken = (_id, email, role) => {
  const jwtConfig = {
    expiresIn: 60 * 50,
    algorithm: 'HS256',
  };
  
  const payload = {
    _id,
    email,
    role,
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const validationAuthToken = (req, resp, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return resp.status(401).json({ message: 'missing auth token' });
    }
    jwt.verify(authorization, secret);
    next();
  } catch (error) {
    console.error(error.message);
    return resp.status(401).json({ message: 'jwt malformed' });
  }
};

const idToken = (authorization) => {
  const { _id: id } = jwt.verify(authorization, secret);
  return id;
};

const emailToken = (authorization) => {
  const { email } = jwt.verify(authorization, secret);
  return email;
};

module.exports = {
  generateAuthToken,
  validationAuthToken,
  idToken,
  emailToken,
};
