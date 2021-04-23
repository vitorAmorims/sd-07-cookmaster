module.exports = {
  messageFailure: (message, httpStatus) => ({
    status: 'failure',
    httpStatus,
    message,
  }),
  messageSuccess: (data, httpStatus) => ({
    status: 'success',
    httpStatus,
    data,
  }),
};
