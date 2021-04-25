const validateNullCamps = (name, ingredients, preparation) => {
  if (
    name === undefined 
    || ingredients === undefined 
    || preparation === undefined
  ) {
    return {
      message: 'Invalid entries. Try again.',
      status: 400,
    };
  }
  return {};
};

module.export = { validateNullCamps };
