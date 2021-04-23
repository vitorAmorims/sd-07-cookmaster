const { verifyDataUsers, verifyEmailRepeated } = require('../schemas/verifyDataUser');

const validateRegisterUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const isValid = verifyDataUsers(name, email, password);
  const isRepeated = await verifyEmailRepeated(email);

  if (isValid.code) next({ status: isValid.code, message: isValid.message });
  if (isRepeated.code) next({ status: isRepeated.code, message: isRepeated.message });

  next();
};

module.exports = validateRegisterUser;
