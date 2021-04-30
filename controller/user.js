const User = require('../service/user.js');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const { code, message, result } = await User.addUser(
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

const addAdmin = async (req, res) => {
  try {
    const { role } = req.data;
    const { name, email, password } = req.body;
    const { code, message, result } = await User.addAdmin(
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
  addUser,
  login,
  addAdmin,
};
