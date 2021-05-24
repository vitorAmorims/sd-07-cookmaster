module.exports = (email) => {
  const emailValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  return emailValidate.test(email);
};
