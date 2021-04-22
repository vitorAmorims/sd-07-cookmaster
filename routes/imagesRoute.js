const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.get('/images/:filename', imageController.getImages);

module.exports = router;
