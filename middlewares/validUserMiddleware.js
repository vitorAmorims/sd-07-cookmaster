const { code, message } = require('../auth/StatusCodes');

const userValidMiddleware = (name, email, password) => {
  const reg = /\S+@\S+\.\S+/;
  const isEmailValid = reg.test(email);

  if (!name || !email || !password || !isEmailValid) {
    return { code: code.bad_request, message: message.bad_request };
  }
  return {};
};

module.exports = {
  userValidMiddleware,
};
