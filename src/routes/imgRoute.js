const express = require('express');
const rescue = require('express-rescue');

const imgController = require('../controllers/imgController');

const router = express.Router();

router.get('/images/:id', rescue(imgController.getImageById));

module.exports = router;
