const jwt = require('jsonwebtoken');
const model = require('../model/user');
const service = require('../service/user');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  if (req.path.split('/').includes('admin')) { role = 'admin'; }
  const resp = await service.createUser(name, email, password, role);
  console.log();
  res.status(resp.status ? resp.status : 201).json(
    resp.status
      ? resp
      : {
          user: resp,
        },
  );
};

const secret = 'taSeguroConfia';

const validateEmail = (email, password) => {
  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }
  return 'ok';
};
const validateUser = async (email, password) => {
  const user = await model.getByEmail(email);
  if (!user || user.password !== password || user.email !== email) {
    return { message: 'Incorrect username or password' };
  }
  return user;
};

const newLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isOk = validateEmail(email, password);
    if (isOk.message) {
      return res.status(401).json(isOk);
    }
    const user = await validateUser(email, password);
    if (user.message) {
      return res.status(401).json(user);
    }
    const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };
    const { _id, role } = user;
    const token = jwt.sign({ data: { email, _id, role } }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = { newLogin, createUser };