const INCORRET = 'Incorrect username or password';

const validadePassword = (password) => {
  if (password !== 'admin' && password.length < 8) return INCORRET;

  return undefined;
}; // req. 2 e 7

const validateLogin = (email, password) => {
  if (!email || !password) return 'All fields must be filled';
  if (!email.includes('mail')) return INCORRET;
  const isNotValidPassword = validadePassword(password);
  if (isNotValidPassword) return isNotValidPassword;

  return undefined;
}; // req. 2

module.exports = {
  validateLogin,
};
