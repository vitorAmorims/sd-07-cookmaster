class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = 'Only admins can register new admins';
  }
}

module.exports = ForbiddenError;