// const INTERNAL_SERVER_ERROR = 500;
// const UNPROCESSABLE_ENTITY = 422;
// const NOT_FOUND = 404;

// const errorMiddleware = (err, _req, res, _next) => {
//   if (err.code === 'not_found') {
//     res.status(NOT_FOUND).json({ err });
//   }
//   if (err.code === 'stock_problem') {
//     return res.status(NOT_FOUND).json({ err });
//   }
//   if (err) {
//     return res.status(UNPROCESSABLE_ENTITY).json({ err });
//   }
//   res.status(INTERNAL_SERVER_ERROR).json({ code: 'server_error' });
// };

// module.exports = { errorMiddleware };
