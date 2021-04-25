// const jwt = require('jsonwebtoken');
const { ObjectId, Logger } = require('mongodb');
const modelsUsers = require('../models/modelsUsers');
const servicesUsers = require('../services/servicesUsers');

// const SUPER_SECRET = NOT_USING_DOTENV;

// rules for login
const rulesForLogin = async (email, password) => {
  if (!email || !password) {
    throw {
      code: 'invalid_user',
      message: 'All fields must be filled',
    };
  }
  const validatedLogin = await modelsUsers.getByEmail(email);
  if (!validatedLogin || validatedLogin.password !== password) {
    throw {
      code: 'unauthorized',
      message: 'Incorrect username or password',
    };
  }
  return true;
};

const createLogin = async (email, password) => {
  // const rules = await rulesForLogin(email, password);
  // if (!rules) {
  //   return false;
  // };
  // if (!email || !password) {
  //   throw {
  //     code: 'invalid_user',
  //     message: 'All fields must be filled'
  //   }
  // }
  const validatedLogin = await modelsUsers.getByEmail(email);
  // if (!validatedLogin || validatedLogin.password !== password) {
  //   throw {
  //     code: 'unauthorized',
  //     message: 'Incorrect username or password'
  //   };
  // }
  console.log('servLog', validatedLogin);
  return validatedLogin;
};

// middleware -------------------------------------------

// const createToken = async (user) => {
//   const user = await modelsUsers.getByEmail(email);
//   const payload = {
//     id: user.id,
//     email: user.email,
//     role: user.role
//   };

//   const token = jwt.sign(payload, SUPER_SECRET);
//   return res.status(200).json({ token });
// };

// const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ message: 'missing auth token' });
//     }
//     const payload = jwt.verify(token, SUPER_SECRET);
//     req.userPayload = payload.userData;
//     return next();
//   } catch (err) {
//     console.log(err.message);
//     return res.status(401).json({ message: 'jwt malformed' });
//   }
// };

module.exports = {
  createLogin,
  // createToken,
  // verifyToken
};


