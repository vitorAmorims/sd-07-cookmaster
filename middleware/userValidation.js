const entriesMessage = {
  message: 'Invalid entries. Try again.',
};
const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const badRequest = 400;
const conflict = 409;

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    res.status(badRequest).json(entriesMessage);
  }
  next();
};

const validationPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    res.status(badRequest).json(entriesMessage);
  }

  next();
};

const validationEmail = (req, res, next) => {
  const { email } = req.body;
  const ValidEmail = regexEmail.test(email);

  if (!ValidEmail || email === undefined) {
    res.status(badRequest).json(entriesMessage);
  }

  next();
};

module.exports = {
  validationName,
  validationPassword,
  validationEmail,
};
