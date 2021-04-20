const UserService = require('../services/UserService');
const { CREATED, ERROR } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const { name, email, password: providedPass } = req.body;
      const { password, _id, ...user } = await UserService.create(name, email, providedPass);
      
      return res.status(CREATED).json({ user });
    } catch (error) {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
