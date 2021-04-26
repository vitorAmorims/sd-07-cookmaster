const {
  verify,
  resLogin,
} = require('../Services/UserService');

const error = require('../error/index');

const addUser = async (req, res) => {
  const resOK = 201;
  try {
    const { name, email, password } = req.body;
    const newUser = await verify(name, email, password);
    return res.status(resOK).json({ user: newUser });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const resOK = 200;
  try {
    const { email, password } = req.body;
    if (!email || !password) throw error.loginInv;
    const loginOk = await resLogin(email, password);
    console.log(loginOk);
    return res.status(resOK).json(loginOk);
  } catch (err) {
    res.status(err.code || 401).json({ message: err.message });
  }
};

module.exports = {
  addUser,
  login,
};