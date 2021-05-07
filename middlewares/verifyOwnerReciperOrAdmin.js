// const validateToken = require('../helpers/validateToken');
// const message = require('../helpers/message.json');

// const verifyOwnerReciperOrAdmin = async (req, res, next) => {
// //   const { user } = req; // usuario { _id, name, email, password, role }
// //   const { id: userId, role } = user;
// //   const { id } = req.params; // id da receita
//   const token = req.headers.authorization; 
//  try {
//     const payload = validateToken(token);
//     req.user = payload;
//   } catch (error) {
//      return res.status(401).json({ message: message.tokenInvalido });
//   }
 
//   next();
// };

// module.exports = verifyOwnerReciperOrAdmin;
