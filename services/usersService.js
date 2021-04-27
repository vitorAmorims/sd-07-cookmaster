const error = 'Invalid entries. Try again.';

const verifyRequest = async (name, email, password) => {
  if (!name || !email || !password) throw new Error(error);
};

const verifyEmail = async (email) => {
  const regexEmail = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;
  const validateEmail = regexEmail.test(email);

  if (!validateEmail) throw new Error(error);
};

const verifyUser = async (user, password) => {
  if (user.password !== password) throw new Error('Incorrect username or password');
};

module.exports = { verifyRequest, verifyEmail, verifyUser };
