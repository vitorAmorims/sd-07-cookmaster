const userServeices = require('../service/userServices');

const CREATED = 201;
const FAIL = 400;

const createUser = async (req, res) => {
  try {
    console.log('entro em controller');
    const { name, email, password } = req.body;
    const result = await userServeices.createUser(name, email, password);
    console.log('saiu de Controller');
    return res.status(CREATED).json(result);
  } catch (error) {
    console.log('ERRO em controller');
    res.status(FAIL).json({ message: error.message }); 
  }
};

module.exports = { createUser };
