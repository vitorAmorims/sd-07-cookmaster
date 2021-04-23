const express = require('express');

const router = express.Router();

const {
    // getAllUsers,
    // getUserById,
    postUser,
    // putUser,
    // deleteUser,
    addAdmin,
  } = require('../controllers/users');

//   const {
//     validateName,
//     validateEmail,
//     validatePassword,
//   } = require('../middlewares');

const midValidateToken = require('../middlewares/doneToken');

//   router.get('/', getAllUsers);

//   router.get('/:id', getUserById);
  
  router.post('/', postUser);

  router.post('/admin', midValidateToken, addAdmin);
  
//   router.put('/:id', putUser);
  
//   router.delete('/:id', deleteUser);
  
  module.exports = router;