const userService = require('../services/UserService');

module.exports = {
  create: async (request, response) => {
    try {
      const { body } = request;
      const { data, httpStatus } = await userService.create(body);
      return response.status(httpStatus).json({ user: data });
    } catch ({ message, httpStatus }) {
      return response.status(httpStatus).json({ message });
    }
  },
  login: async (request, response) => {
    try {
      const { body } = request;
      const { data, httpStatus } = await userService.login(body);
      return response.status(httpStatus).json({ token: data });
    } catch ({ message, httpStatus }) {
      return response.status(httpStatus).json({ message });
    }
  },
};
