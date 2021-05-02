const { body } = require('express-validator');
const { invalidEntry } = require('../messages');

const recipeSchema = [
  body('name').exists({ checkFalsy: true }).withMessage(invalidEntry),
  body('ingredients').exists({ checkFalsy: true }).withMessage(invalidEntry),
  body('preparation').exists({ checkFalsy: true }).withMessage(invalidEntry),
];

module.exports = recipeSchema;