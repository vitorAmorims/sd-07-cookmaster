const { body } = require('express-validator');
const { invalidEntry } = require('../messages');

const userSchema = [
  body('name').exists({ checkFalsy: true }).withMessage(invalidEntry),
  body('email')
    .exists({ checkFalsy: true })
    .withMessage(invalidEntry)
    .isEmail()
    .withMessage(invalidEntry),
  body('password').exists({ checkFalsy: true }).withMessage(invalidEntry),
];

module.exports = userSchema;