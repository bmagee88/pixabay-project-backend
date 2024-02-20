class NonObjectInListException extends Error {
    constructor(message) {
      super(message);
      this.name = 'NonObjectInListException';
    }
  }
  module.exports = NonObjectInListException;