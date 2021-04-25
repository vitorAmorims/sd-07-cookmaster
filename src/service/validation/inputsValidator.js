const { ObjectId } = require('mongodb');
const validator = require('validator');
const { getUserByEmail } = require('../../model/userModel');
const { BAD_INPUT, BAD_INPUT_RECIPE, EMAIL_TAKEN, PASS_SETUP } = require('../servDictionary');

const preCheckFields = (inputInfo, mandatoryFields) => {
  const correctEntries = mandatoryFields.find((field) => !Object.keys(inputInfo).includes(field));
  const allStrings = Object.values(inputInfo)
    .find((value) => typeof value !== 'string');
  if (allStrings === 0 || correctEntries) {
    return mandatoryFields[1] === 'email'
      ? { status: BAD_INPUT }
      : { status: BAD_INPUT_RECIPE };
  }
  return false;
};

const validMongoId = (id) => ObjectId.isValid(id);

const emailInDb = async (email) => {
  const dbRes = await getUserByEmail(email);
  return dbRes ? { status: EMAIL_TAKEN } : false;
};

const inputsValidator = (body, fields) => {
  const preCheckFail = preCheckFields(body, fields);
  if (preCheckFail) {
    return preCheckFail;
  }
  const { email, name, password } = body;
  const validEmail = validator.isEmail(email);
  if (!validEmail) {
    return { status: BAD_INPUT };
  }
  const strongPass = validator.isStrongPassword(password, PASS_SETUP);
  if (!strongPass) {
    return { status: BAD_INPUT };
  }
  const validName = validator.isAlpha(name.replace(/ /g, ''));
  if (!validName) {
    return { status: BAD_INPUT };
  }
  return false;
};

module.exports = {
  emailInDb,
  inputsValidator,
  preCheckFields,
  validMongoId,
};