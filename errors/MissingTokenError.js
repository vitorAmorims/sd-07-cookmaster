class MissingTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = 'missing auth token';
  }
}

module.exports = MissingTokenError;