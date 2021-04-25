const { ApiStatusCode } = require('../enums');
const { validationSchema } = require('../schemas');

const auth = async (req, res) => {
  try {
    const user = req.body;
    return res.status(ApiStatusCode.SUCCESS).json(validationSchema.generateToken(user));
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  auth,
};