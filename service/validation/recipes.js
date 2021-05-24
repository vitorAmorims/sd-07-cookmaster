const { errorMessages: error } = require('../../utils');

module.exports = { 
  name: (name) => {
    if (!name) throw new Error(error.INVALID_ENTRIES);
  },

  ingredients: (ingredients) => {
    if (!ingredients) throw new Error(error.INVALID_ENTRIES);
  },

  preparation: (preparation) => {
    if (!preparation) throw new Error(error.INVALID_ENTRIES);
  },
};
