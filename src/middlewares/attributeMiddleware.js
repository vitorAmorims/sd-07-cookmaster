const validation = require('../validation');
const UserModel = require('../models/UserModel');

const emailMiddleware = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (validation.validationAttributes(name, email, password)) {
        return res.status(400).send({ message: 'Invalid entries. Try again.' });
    }
    if (validation.validationEmail(email)) {
        return res.status(400).send({
            message: 'Invalid entries. Try again.',
        });
    }
    const emailExist = await UserModel.findByEmail(email);
    if (emailExist) {
      return res.status(409).send({
        message: 'Email already registered',
      });
    }

    next();
};

module.exports = emailMiddleware;
