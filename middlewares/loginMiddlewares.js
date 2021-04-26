  const UNAUTHORIZED = 401;
  const ALLFIELDS = 'All fields must be filled';

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(UNAUTHORIZED).send({
      message: ALLFIELDS });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(UNAUTHORIZED).send({
      message: ALLFIELDS });
  }
  next();
};

module.exports = {
  validateEmail, validatePassword,
};