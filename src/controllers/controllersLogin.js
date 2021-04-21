const servicesLogin = require('../services/servicesLogin');

const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const CONFLICT = 409;
const UNPROCESSABLEENTITY = 422;
const INTERNALSERVERERROR = 500;

const createNewLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const logedUser = await servicesLogin.createLogin(email, password);
    if (!logedUser) {
      return res.status(BADREQUEST).json(
        { message: 'Login was not possible' }
      );
    }
    return res.status(CREATED).json(logedUser);
  } catch (err) {
    if (err.code === 'User was not created') {
      return res.status(UNPROCESSABLEENTITY).json({ err });
    }
    res.status(INTERNALSERVERERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  // createNewLogin
};
