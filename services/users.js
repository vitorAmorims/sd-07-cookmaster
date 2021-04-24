const users = require('../models/users');

function err(message) {
  return {
    success: false,
    err: message,
  };
}

function success(data) {
  return {
    success: true,
    data,
  };
}

const validateEmail = (mail) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(mail);
};

const validateRegisterUserData = async ({ name, email, password }) => {
  if (!name || !email || !password || !validateEmail(email)) {
    throw new Error('Invalid entries. Try again.');
  }
};

const validateUser = async ({ email }) => {
  const isntNewEmail = await users.getEmail(email);
  if (isntNewEmail !== null) throw new Error('Email already registered');
};

const registerUser = async (name, email, password, role) => {
  try {
    await validateRegisterUserData({ name, email, password });
    await validateUser({ email });
  } catch (e) {
    return err(e.message);
  }

  const newUser = await users.registerUser(name, email, password, role);
  return success({
    user: {
      name,
      email,
      role: 'user',
      _id: newUser.insertedId,
    },
  });
};

module.exports = {
  registerUser,
};