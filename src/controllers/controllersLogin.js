const jwt = require('jsonwebtoken');

const servicesLogin = require('../services/servicesLogin');
// const token = require('../middlewares/token');

const SUPER_SECRET = 'NOT_USING_DOTENV';

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const CONFLICT = 409;
const UNPROCESSABLEENTITY = 422;
const INTERNALSERVERERROR = 500;

// const createNewLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const logedUser = await servicesLogin.createLogin(email, password);
//     console.log('controlLog01', logedUser);
//     if (!logedUser) {
//       console.log('controlLogIF01');
//       return res.status(BADREQUEST).json(
//         { message: 'Login was not possible' }
//       );
//     }
//     const newToken = await token.createToken(data);
//     // return res.status(CREATED).json(logedUser);
//     console.log('controlLog02', newToken);
//     return res.status(CREATED).json({ newToken });
//   } catch (err) {
//     if (err.code === 'User was not created') {
//       return res.status(UNPROCESSABLEENTITY).json({ err });
//     }
//     res.status(INTERNALSERVERERROR).json({ message: 'Internal Server Error' });
//   }
// };

const createNewLogin = async (req, res) => {
  const { email } = req.body;
  const user = await servicesLogin.createLogin(email);
  const payLoad = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign({ payLoad }, SUPER_SECRET);
  res.status(OK).json({ token });
};

module.exports = {
  createNewLogin,
  SUPER_SECRET
};
