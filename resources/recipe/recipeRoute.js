const express = require('express');
// const rescue = require('express-rescue');

const router = express.Router();

const BASE_ENDPOINT = '/recipe';

router.post(BASE_ENDPOINT);
router.get(BASE_ENDPOINT);
router.get(BASE_ENDPOINT);
router.put(BASE_ENDPOINT);
router.delete(BASE_ENDPOINT);

module.exports = router; 