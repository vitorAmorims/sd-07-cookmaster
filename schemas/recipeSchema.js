// validação feita om ajuda dos videos do conteudo da aulda do dia 27.2

const errors = {
  noNameIngredientOrPrepField: 'Invalid entries. Try again.',
  existentEmail: 'Email already registered',
};

const badRequest = 400;

const validateNameIngrPrep = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return { code: badRequest, message: errors.noNameIngredientOrPrepField };
  }
  return {};
};

module.exports = {
  validateNameIngrPrep,
};