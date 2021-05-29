const User = require('../../services/UserServices');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const { code, message, result } = await User.createUser(
      name,
      email,
      password,
      role,
    );
    if (!result) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(code).json({ user: result });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { code, message, token } = await User.login(email, password);

    if (!token) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro interno', error: err });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { role } = req.user;
    const { name, email, password } = req.body;
    const { code, message, result } = await User.createAdmin(
      name,
      email,
      password,
      role,
    );
    if (!result) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(code).json({ user: result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  login,
  createAdmin,
};