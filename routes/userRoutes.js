const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();
const USERID = '/users/:id';
const USER = '/users';

router.get(USER, userControllers.getAllUsers);
router.get(USERID, userControllers.getUserById);
router.post(USER, userControllers.createUser);
router.put(USERID, userControllers.updateUser);
router.delete(USERID, userControllers.deleteUser);

module.exports = router;
