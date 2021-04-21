const cryptography = require('../../helpers/cryptography');

const { service: userService } = require('../user');

const login = async (email, password) => {
  try {
    const foundUser = await userService.findByEmail(email);
    const isMatch = cryptography.cryptCompare(password, foundUser.password);
    if (!isMatch) {
      throw new Error();
    }

    return cryptography.generateUserToken(foundUser.email);
  } catch (error) {
    throw new Error('Incorrect username or password');
  }
};

module.exports = {
  login,
};