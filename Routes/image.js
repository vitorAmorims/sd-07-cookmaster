const express = require('express');
const { getImage } = require('../Controller/image');

const router = express.Router();
router.use(express.static(`${__dirname}/images`));

router.get('/images/:id', getImage);

module.exports = router;