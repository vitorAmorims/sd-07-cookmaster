const {
  verify,
} = require('../Services/UserService');

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

module.exports = {
  addUser,
};