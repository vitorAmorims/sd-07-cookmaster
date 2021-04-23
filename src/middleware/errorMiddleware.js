// const errorMiddleware = (err, req, res, next) => {
//   if (err.status) {
//     return res
//     .status(err.status)
//     .send({
//         console: 'Console middleware de erro do app -> ',
//         message: err.message,
//         statusCode: err.statusCode,
//         statusMessage: err.statusMessage,
//         url: err.url,
//       });
//   }
//   res
//       .status(500)
//       .send({
//         message: err.message,
//         url: err.url,
//       });
//   next();
//   };

// module.exports = errorMiddleware;