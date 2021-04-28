const { statusMsgMap } = require('../src/controller/dictionaries');

module.exports = (error, _req, res, _next) => {
  const { err } = error;
  const { status, message } = statusMsgMap[`${err}`];
  console.log('ERROR @ errMiddleware', err);

  return error.JsonWebTokenError
    ? res.status(statusMsgMap['missing token'].status)
      .json({ message: statusMsgMap['missing token'].message })
    : res.status(status).json({ message });
};

// module.exports = (error, _req, res, _next) => {
//   console.log('ERROR @ errMiddleware', error.err, error);
//   const { err } = error;
//   return res.status(statusMsgMap[`${err}`].status
//     || statusMsgMap['permition denied'].status)
//       .json(statusMsgMap[`${err}`].message
//         || statusMsgMap['permition denied'].message);
// };
