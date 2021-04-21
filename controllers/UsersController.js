const userService = require('../services/UsersService');
const userModel = require('../models/Users');
const errorMsg = require('../utils/errorMsg');

const add = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.add(name, email, password);
    
    if (newUser.message) {
      return res.status(409).json(newUser);  
    }

    return res.status(201).json({ user: newUser });
  } catch (error) {    
    res.status(500).json({ message: errorMsg }); 
  }  
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginAttempt = await userService.login(email, password);
    
    if (loginAttempt.message) {
      return res.status(401).json(loginAttempt);
    }

    return res.status(200).json({ token: loginAttempt });
  } catch (error) {
    res.status(500).json({ message: errorMsg }); 
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const role = 'admin';
    const newAdmin = await userModel.add(name, email, password, role);
    
    return res.status(201).json({ user: newAdmin });
  } catch (error) {
    res.status(500).json({ message: errorMsg }); 
  }
};

module.exports = {
  add,
  login,
  addAdmin,
};