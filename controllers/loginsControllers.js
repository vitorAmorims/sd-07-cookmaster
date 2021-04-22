const loginService = require('../services/loginService');
const errors = require('../errors');

async function addNewToken(req, res) {
  const responseOK = 200;
  try {
    const { email, password } = req.body;
    if (!email || !password) throw errors.loginEntries;
    const token = await loginService.registerTokenUser(email, password);
    res.status(responseOK).json({ token });
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
}

module.exports = {
  addNewToken,
};
