class ListEmptyException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ListEmptyException';
    }
  }
  module.exports = ListEmptyException;