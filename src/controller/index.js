const userServeices = require('../service/userServices');

const CREATED = 201;
const FAIL = 400;

const createUser = async (req, res) => {
  try {
    console.log('entro em controller');
    const { name, email, password } = req.body;
    const user = await userServeices.createUser(name, email, password);
    console.log(user.ops[0]);
    console.log('saiu de Controller');
    return res.status(CREATED).json({ user: user.ops[0] });
  } catch (error) {
    console.log('ERRO em controller');
    res.status(FAIL).json({ message: error.message }); 
  }
};

const login = async (req, res) => {
  try {
    return console.log('ok');
  } catch (error) {
    return res.status(FAIL).json({ message: error.message }); 
  }
};

module.exports = { createUser, login };
