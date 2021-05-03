const { check } = require('express-validator');
const { allFields, incorrect } = require('../messages');

const loginSchema = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage(allFields)
    .isEmail()
    .withMessage(incorrect)
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0]+(?:\.[a-zA-Z0-9-]+)*$/)
    .withMessage(incorrect),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage(allFields)
    .custom((value) => {
      console.log('Valor: ', value);
      if (value !== 'admin' && value.length < 8) {
        throw new Error(incorrect);
      }
      return value;
    }),
];

module.exports = loginSchema;