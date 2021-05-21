class CustomError extends Error {
  constructor({ status, message }) {
    super(message);

    this.status = status;
  }
}

module.exports = { CustomError };
// source: Github Anderson Alves / plantão Rufino