class KeyTypeNotSupportedException extends Error {
    constructor(message) {
      super(message);
      this.name = 'KeyTypeNotSupportedException';
    }
  }

  module.exports = KeyTypeNotSupportedException;
  
