// Retirado do stackoverflow
// https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript

class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = CustomError;
