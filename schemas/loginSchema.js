const { body } = require('express-validator');
const { allFields, incorrect } = require('../messages');

const loginSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage(allFields)
    .isEmail()
    .withMessage(incorrect)
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0]+(?:\.[a-zA-Z0-9-]+)*$/)
    .withMessage(incorrect),
  body('password')
    .exists({ checkFalsy: true })
    .withMessage(allFields)
    .isLength({ min: 7 })
    .withMessage(incorrect),
];

module.exports = loginSchema;