const emailPassInvalid = (email, password) => {
  if (!email || !password) {
    return true;
  }

  return false;
};

module.exports = emailPassInvalid;
