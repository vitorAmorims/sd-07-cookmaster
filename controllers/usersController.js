const jwt = require('jsonwebtoken');
const { add, getUserEmail } = require('../models/UsersModel');
const { verifyRequest, verifyEmail, verifyUser } = require('../services/usersService');

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 409;

const secret = 'ninguemiraadvinharessasenhatoda'; 

const jwtConfig = {
  expiresIn: 60 * 1000,
  algorithm: 'HS256',
};

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await verifyRequest(name, email, password);
    await verifyEmail(email);
    
    const userEmail = await getUserEmail(email);
    if (userEmail) return res.status(CONFLICT).json({ message: 'Email already registered' });

    const user = await add(name, email, password);

    res.status(CREATED).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(BAD_REQUEST).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('All fields must be filled');
    const userData = await getUserEmail(email);
    if (!userData) throw new Error('Incorrect username or password');
    await verifyUser(userData, password);

    const { _id } = userData;
    const payload = { id: _id, email: userData.email, role: userData.role };
    
    const token = jwt.sign(payload, secret, jwtConfig);
    res.status(SUCCESS).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(UNAUTHORIZED).json({ message: err.message });
  }
};

module.exports = { addUser, loginUser };
