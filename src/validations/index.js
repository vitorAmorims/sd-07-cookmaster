const ERROR_MESSAGE = 'Invalid entries. Try again.';
const mailValidate = (email) => {
  const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/);
  const emailIsValid = regexEmail.test(email);
  if (email === '' || email === undefined) throw new Error(ERROR_MESSAGE);
  if (!emailIsValid) throw new Error(ERROR_MESSAGE);
};

const mailDuplicateValidate = (emailStored, emailRequested) => {
  if (emailStored === emailRequested) throw new Error('Email already registred');
};

const passValidate = (password) => {
  if (password === '' || password === undefined) {
    throw new Error(ERROR_MESSAGE);
  }
  const passString = password.toString();
  if (passString.length < 6) {
    throw new Error(ERROR_MESSAGE);
  }
};

const nameValidate = (name) => {
  if (name === '' || name === undefined) {
    throw new Error(ERROR_MESSAGE);
  }
  if (name.length < 3) throw new Error(ERROR_MESSAGE);
};

module.exports = {
  mailValidate,
  nameValidate,
  passValidate,
  mailDuplicateValidate,
};
