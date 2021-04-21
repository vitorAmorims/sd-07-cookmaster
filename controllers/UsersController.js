const userService = require('../services/UsersService');

const add = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.add(name, email, password);
    
    if (newUser.message) {
      return res.status(409).json(newUser);  
    }

    return res.status(201).json({ user: newUser });
  } catch (error) {    
    res.status(500).json({ message: 'Something went wrong.' }); 
  }  
};

const login = async (req, res) => {
  // try {
    const { email, password } = req.body;
    const loginAttempt = await userService.login(email, password);
    
    if (loginAttempt.message) {
      return res.status(401).json(loginAttempt);
    }

    return res.status(200).json({ token: loginAttempt });
  // } catch (error) {
  //   res.status(500).json({ message: 'Something went wrong.' }); 
  // }
};

module.exports = {
  add,
  login,
};