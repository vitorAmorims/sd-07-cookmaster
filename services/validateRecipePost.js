const { statusMessages } = require('../utils');

module.exports = {
  nameValidation: (name) => {
    if (!name) {
      throw new Error(statusMessages.INVALID_ENTRIES);
    }
  },
  ingredientsValidation: (ingredients) => {
    if (!ingredients) {
      throw new Error(statusMessages.INVALID_ENTRIES);
    }
  },
  preparationValidation: (preparation) => {
    if (!preparation) {
      throw new Error(statusMessages.INVALID_ENTRIES);
    }
  },
};