const express = require('express');

const router = express.Router();

const {
    // getAllUsers,
    // getUserById,
    checkLogin
    // putUser,
    // deleteUser,
  } = require('../controllers/login');

//   router.get('/', getAllUsers);

//   router.get('/:id', getUserById);
  
  router.post('/', checkLogin);
  
//   router.put('/:id', putUser);
  
//   router.delete('/:id', deleteUser);
  
  module.exports = router;