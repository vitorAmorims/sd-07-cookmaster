// const Recipes = require('../models/recipesModels');

// const SUCCESS = 200;
// const SYSTEM_FAIL = 500;
// const FAIL = 404;

// const addSale = async (req, res) => {
//   const itemsSold = req.body;
//   try {
//     const results = await Sales.addSale(itemsSold);
//     res.status(SUCCESS).json(results.ops[0]);
//   } catch (err) {
//     res.status(SYSTEM_FAIL).json({ message: err.message });
//   }
// };

// module.exports = {
//   addSale,
// };