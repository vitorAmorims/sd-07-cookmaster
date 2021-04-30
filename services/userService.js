/** @format */

const { create, createAdmin, getEmail } = require('../models');

const getEmailUser = async (email) => getEmail(email);

const createUser = async (name, emails, password, role) =>
  create(name, emails, password, role);

const createAdmins = async (name, emails, password, role) =>
  createAdmin(name, emails, password, role);

module.exports = { createUser, getEmailUser, createAdmins };
