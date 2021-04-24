const validateUserService = async (name, email, password) => {
  const regex = /\S+@\S+\.\S+/;
  if (!name || !email || !password || !regex.test(email)) {
    return false;
  } return true;
};

module.exports = validateUserService;