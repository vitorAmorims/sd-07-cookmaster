const UserService = require('../services/UserService');
const { CREATED, FORBIDDEN, ERROR } = require('./status');

module.exports = {
  create: async (req, res) => {
    try {
      const { name, email, password: providedPass } = req.body;
      const { password, _id, ...user } = await UserService.create(
        name,
        email,
        providedPass,
        'user',
      );
      
      return res.status(CREATED).json({ user });
    } catch {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
  admin: async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
      }

      const { name, email, password: providedPass } = req.body;
      const { password, _id, ...user } = await UserService.create(
        name,
        email,
        providedPass,
        'admin',
      );

      return res.status(CREATED).json({ user });
    } catch {
      return res.status(ERROR).json({ message: 'An internal error has occurred' });
    }
  },
};
