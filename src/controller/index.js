const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const userServeices = require('../service/userServices');

const SUCESS = 200;
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
    return res.status(FAIL).json({ message: error.message }); 
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const secret = 'senhaMuitoSecrataParaDecodificacao';

  try {
    const result = await userServeices.findByEmail(email);
    const payload = {
      email: result.email,
      role: result.role,
      id: ObjectID(result.id),
    };
    const token = jwt.sign(payload, secret);
    await userServeices.login(email, password);

    return res.status(SUCESS).json({ token });
  } catch (error) {
    return res.status(FAIL).json({ message: error.message }); 
  }
};

module.exports = { createUser, login };
