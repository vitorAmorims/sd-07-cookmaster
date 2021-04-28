const express = require('express');
const {
  getImageByName,
} = require('../controllers');

const router = express.Router();

router.get('/images/:id', getImageByName);

module.exports = router;
