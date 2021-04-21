const userService = require('../service/userService');
const { generateToken } = require('../helper/jwt');
const jwt = require('../helper/jwt');

const getAll = async (req, res) => {
  const resposta = await userService.getAll();
  return res.status(201).send(resposta);
};

const create = async (req, res) => {
  const { name, email, password, role } = req.body;
  const resposta = await userService.create(name, email, password, role);
  if (!resposta) return res.status(409).send({ message: 'Email already registered' }); 
  return res.status(201).send({ user: resposta });
};

const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { authorization } = req.headers;
  const decoded = await jwt.decodeToken(authorization);
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).send(
      { message: 'Only admins can register new admins' },
      ); 
    }
  const resposta = await userService.create(name, email, password, 'admin');
  if (!resposta) return res.status(409).send({ message: 'Email already registered' }); 
  return res.status(201).send({ user: resposta });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).send({ message: 'All fields must be filled' });
  const successLogin = await userService.checkLogin(email, password);
  if (!successLogin) return res.status(401).send({ message: 'Incorrect username or password' });
  return res.status(200).send({ token: generateToken(successLogin) });
};
module.exports = { getAll, create, login, createAdmin };