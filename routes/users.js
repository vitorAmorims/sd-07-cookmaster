const express = require('express');

const router = express.Router();

const {
    // getAllUsers,
    // getUserById,
    postUser,
    // putUser,
    // deleteUser,
  } = require('../controllers/users');

//   const {
//     validateName,
//     validateEmail,
//     validatePassword,
//   } = require('../middlewares');

//   router.get('/', getAllUsers);

//   router.get('/:id', getUserById);
  
  router.post('/', postUser);
  
//   router.put('/:id', putUser);
  
//   router.delete('/:id', deleteUser);
  
  module.exports = router;