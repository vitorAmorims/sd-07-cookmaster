module.exports = (req, res, next) => {
  const { name, preparation, ingredients } = req.body;
  if (!preparation || !ingredients || !name) {
    return res.status(400).send({ message: 'Invalid entries. Try again.' }); 
  }
  next();
};
