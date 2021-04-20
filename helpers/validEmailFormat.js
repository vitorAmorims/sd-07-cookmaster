const validEmailFormat = (email) => {
  const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (regexEmail.test(email)) {
    return true;
  }
  return false;
};

module.exports = validEmailFormat;
