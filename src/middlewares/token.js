// const jwt = require('jsonwebtoken');
const modelsUsers = require('../models/modelsUsers');
const controllersLogin = require('../controllers/controllersLogin');
// const SUPER_SECRET = 'NOT_USING_DOTENV';

// const createToken = async (user) => {
//   console.log(user);
//   const jwtConfig = {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   }; 
//   // const user = await modelsUsers.getByEmail(email);
//   // const payload = {
//   //   id: user.id,
//   //   email: user.email,
//   //   role: user.role
//   // };
//   const { password: _, ...userWithoutPassword } = user;
//   const { _id: id } = userWithoutPassword;
//   const payload = {
//     sub: id,
//     userData: userWithoutPassword,
//   };
//   const token = jwt.sign(payload, SUPER_SECRET, jwtConfig);
//   console.log('tokenmiddle', token);
//   return res.status(200).json({ token });
// };

// const createToken = async (req, res) => {
//   const { email } = req.body;
//   const user = await modelsUsers.getByEmail(email);
//   const data = {
//     id: user.id,
//     email: user.email,
//     role: user.role,
//   };
//   const token = jwt.sign({ data }, SUPER_SECRET);
//   res.status(200).json({ token });
// }

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    const payload = jwt.verify(token, controllersLogin.SUPER_SECRET);
    req.userPayload = payload.userData;
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  // createToken,
  verifyToken,
  // SUPER_SECRET
};
