const express = require('express');

const { NotFoundException } = require('./exception');

const route = express.Router();

module.exports = route;

route.get('/error', (req, res, next) => { if ('xablau' === 'xablau') throw new NotFoundException('recipeNotFound'); next(); }, (_req, res) => { res.send('xablau'); });