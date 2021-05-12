const checkEntries = (request, _response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return next({ status: 400, message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = checkEntries;
