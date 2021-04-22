const express = require('express');
const { usersController } = require('../controllers');

const route = express.Router();

// (_, res) => { res.send('deu bom'); }
route.post('/users', usersController.userRegistration);

module.exports = route;