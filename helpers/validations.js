const validateFieldRequired = (field) => {
  if (field === undefined || field === null) {
    throw new Error();
  }
};

const validateEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexEmail.test(email)) {
    throw new Error();
  }
};

module.exports = {
  validateFieldRequired,
  validateEmail,
};