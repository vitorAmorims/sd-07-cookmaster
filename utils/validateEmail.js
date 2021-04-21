const validateEmail = (email) => {
  // regex obtido em: 
  // https://tutorial.eyehunts.com/js/email-regex-javascript-validation-example-code/
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (regexEmail.test(email)) {
    return true;
  }

  return false;
};

module.exports = validateEmail;