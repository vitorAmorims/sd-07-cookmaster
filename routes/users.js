const express = require('express');

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  addAdmin,
} = require('../controllers/users');

const midValidateToken = require('../middlewares/doneToken');

  router.get('/', midValidateToken, getAllUsers);

  router.get('/:id', midValidateToken, getUserById);
  
  router.post('/', postUser);

  router.post('/admin', midValidateToken, addAdmin);
  
  router.put('/:id', midValidateToken, putUser);
  
  router.delete('/:id', midValidateToken, deleteUser);
  
  module.exports = router;