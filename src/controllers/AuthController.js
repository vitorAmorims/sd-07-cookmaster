const bcrypt = require('bcrypt');
const { SUCCESS, UNAUTHORIZED, ERROR } = require('./status');
const UserService = require('../services/UserService');
const jwt = require('../config/jwt');

module.exports = {
  login: async (req, res) => {
    try {    
      const user = await UserService.get(req.body.email);    
      const passwordMatch = bcrypt.compareSync(req.body.password, user?.password ?? '');
      
      if (!user || !passwordMatch) {
        return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
      }
  
      const { password, ...secureUser } = user;
      const token = jwt.sign({ user: secureUser });
  
      return res.status(SUCCESS).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
