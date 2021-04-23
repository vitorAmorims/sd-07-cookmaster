const userModel = require('../models/userModel');
const createToken = require('../schemas/createToken');

const logIn = async (req, res) => {
  try {
    const { email } = req.body;

    const { 
      password: passwordDB, 
      name: nameDB,
      ...userWithoutPassword 
    } = await userModel.findByEmail(email);

  const token = createToken(userWithoutPassword);

  res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro de servidor' });
  }
};

module.exports = logIn;