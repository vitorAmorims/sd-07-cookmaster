const userService = require('../services/UserService');

module.exports = {
  async create(request, response) {
    const { body } = request;
    const { status, data, message, httpStatus } = await userService.create(body);
    if (status === 'failure') {
      return response.status(httpStatus).json({ message });
    }
    return response.status(httpStatus).json({ user: data });
  },
  async login(request, response) {
    const { body } = request;
    const { status, data, message, httpStatus } = await userService.login(body);
    if (status === 'failure') {
      return response.status(httpStatus).json({ message });
    }
    return response.status(httpStatus).json({ token: data });
  },
};
