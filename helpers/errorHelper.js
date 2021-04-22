// Orientação de Gabriel Rufino no plantão do dia 19-04-2021 <3
class CustomError extends Error {
  constructor({ status, message }) {
    super(message);

    this.status = status;
    // this.message = message;
  }
}

// throw new CustomError({ status: 401, message: 'saaaalve' });

module.exports = { CustomError };