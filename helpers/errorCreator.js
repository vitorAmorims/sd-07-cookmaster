const createError = (myCode, messageErr) => ({
    code: myCode,
    message: messageErr,
  });

  module.exports = createError;