// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const formatEmail = (email) => {
  const emailReg = /\S+@\S+\.\S+/;
  return emailReg.test(email);
};

const userDataNotOk = (name, email, password) => {
  if (!name || !email || !password) return true;
};

module.exports = {
  formatEmail,
  userDataNotOk,
};
