const validEmailFormat = require('./validEmailFormat');
const validName = require('./validName');
const validPassword = require('./validPassword');
const validEmailExist = require('./validEmailExist');
const validUserLogin = require('./validLogin');
const status = require('./statusCodes');

module.exports = {
  validEmailFormat,
  validName,
  validPassword,
  validEmailExist,
  validUserLogin,
  status,
};
