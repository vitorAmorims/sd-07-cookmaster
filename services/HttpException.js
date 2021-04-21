class HttpExcepetion extends Error {
  constructor(message, status) {
    super(message, status);
    this.status = status;
  }
}

module.exports = HttpExcepetion;