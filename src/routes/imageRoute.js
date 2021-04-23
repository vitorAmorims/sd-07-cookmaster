const express = require('express');
const rescue = require('express-rescue');

const imageController = require('../controllers/imageController');

const router = express.Router();

router.get('/images/:id', rescue(imageController.getImageById));

module.exports = router;
