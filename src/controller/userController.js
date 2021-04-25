const { userService } = require('../services');
const { ApiStatusCode } = require('../enums');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userRes = await userService.createUser(name, email, password);
    return res.status(ApiStatusCode.CREATED).json(userRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const admin = req.body;
    const adminRes = await userService.createAdmin(admin);
    return res.status(ApiStatusCode.CREATED).json(adminRes);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {  
  createUser,
  createAdmin,
};