class ListNotArrayException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ListNotArrayException';
    }
  }
  module.exports = ListNotArrayException;