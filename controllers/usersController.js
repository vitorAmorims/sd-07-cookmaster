// const express = require('express');

const CODES = require('../configurations/statusCodes');
const Services = require('../services');

const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const users = await Services.createNewUser(name, email, password);
    res.status(CODES.CREATED).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
};