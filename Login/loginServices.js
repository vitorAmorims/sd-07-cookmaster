const validateLogin = (email, password) => {
  if (!email || !password) return 'All fields must be filled';

  if (!email.includes('gmail') || password.length < 8) return 'Incorrect username or password';

  return undefined;
}; // req. 2

module.exports = {
  validateLogin,
};
