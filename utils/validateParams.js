const { createErrorMessage, createSuccessMessage } = require('./createMessage');
const {
  INVALID_ENTRIES, EMPTY_FIELDS, INCORRECT_CREDENTIALS, MISSING_ID,
} = require('./errorMessage');

const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isParamString = (string) => !!string && typeof string === 'string';
const isEmailValid = (email) => isParamString(email) && email.match(validEmailRegex);
const isNotRootUser = (email, password) => email !== 'root@email.com' && password.length < 7;

function validateCreateUser(name, email, password) {
  if (
    !isParamString(name)
    || !isEmailValid(email)
    || !isParamString(password)
  ) return createErrorMessage(400, INVALID_ENTRIES);

  return createSuccessMessage();
}

function validateLogin(email, password) {
  if (!isEmailValid(email) || !isParamString(password)) {
    return createErrorMessage(401, EMPTY_FIELDS);
  }

  if (!isEmailValid(email) || isNotRootUser(email, password)) {
    return createErrorMessage(401, INCORRECT_CREDENTIALS);
  }

  return createSuccessMessage();
}

function validateCreateRecipe(name, ingredients, preparation) {
  if (
    !isParamString(name)
    || !isParamString(ingredients)
    || !isParamString(preparation)
  ) return createErrorMessage(400, INVALID_ENTRIES);

  return createSuccessMessage();
}

function validateEditRecipe(id, name, ingredients, preparation) {
  if (
    !isParamString(id)
    || !isParamString(name)
    || !isParamString(ingredients)
    || !isParamString(preparation)
  ) return createErrorMessage(400, INVALID_ENTRIES);

  return createSuccessMessage();
}

function validateDeleteRecipe(id, userId, userRole) {
  if (
    !isParamString(id)
    || !isParamString(userId)
    || !isParamString(userRole)
  ) return createErrorMessage(400, INVALID_ENTRIES);

  return createSuccessMessage();
}

function validateGetRecipeById(id) {
  if (!isParamString(id)) {
    return createErrorMessage(400, MISSING_ID);
  }

  return createSuccessMessage();
}

module.exports = {
  validateGetRecipeById,
  validateCreateUser,
  validateCreateRecipe,
  validateLogin,
  validateEditRecipe,
  validateDeleteRecipe,
};