const { SUCCESS, UNAUTHORIZED, ERROR } = require('./status');
const UserService = require('../services/UserService');
const jwt = require('../config/jwt');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password: providedPass } = req.body;
      const user = await UserService.get(email);
      
      if (!user || providedPass !== user.password) {
        return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
      }
  
      const { password, name, ...userInfo } = user;
      const token = jwt.sign({ user: userInfo });
  
      return res.status(SUCCESS).json({ token });
    } catch (error) {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
  authenticate: async (req, res, next) => {
    try {
      const auth = req.headers?.authorization;
      const token = jwt.verify(auth);
      req.user = token.user;
      next();
    } catch (error) {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
  },
};
