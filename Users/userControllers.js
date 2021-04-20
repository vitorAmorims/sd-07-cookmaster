const userModel = require('./userModels');
const userService = require('./userServices');

// const OK = 200;
const CREATED = 201;
const BADREQUEST = 400;
const CONFLICT = 409;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const validateNewUser = await userService.validateNewUser(name, email, password);
    if (validateNewUser) throw new Error(validateNewUser);
    
    const newUser = await userModel.createUser(name, email, password);
    res.status(CREATED).json({ user: newUser });
  } catch (error) {
    if (error.message === 'Invalid entries. Try again.') {
      return res.status(BADREQUEST).json({ message: error.message });
    }

    res.status(CONFLICT).json({ message: error.message });
  }
};

module.exports = {
  createUser,
};
