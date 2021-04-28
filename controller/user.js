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
    res.status(code).json({ user: result });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addUser,
};
