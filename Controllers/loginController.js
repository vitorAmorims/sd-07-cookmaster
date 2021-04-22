const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const loginService = require('../Services/loginService');

const senhaJwt = 'swordfish';
const addStatus = 200;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.loginUser(email);
    // if (!user) return res.status(401).json({ message: 'Incorrect username or password' });
    const payload = {
      id: ObjectID(user.id),
      email: user.email,
      password: user.password,
      role: user.role,
    };

    const token = jwt.sign(payload, senhaJwt); 
    await loginService.loginUser(email, password);
    res.status(addStatus).json({ token });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  loginUser,
};
