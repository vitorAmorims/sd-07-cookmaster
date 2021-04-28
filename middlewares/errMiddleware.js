const { statusMsgMap } = require('../src/controller/dictionaries');

module.exports = (error, _req, res, _next) => {
  console.log('ERROR @ errMiddleware', error.err, error);
  const { err } = error;
  const { status, message } = statusMsgMap[`${err}`];
  return res.status(status).json({ message });
};
