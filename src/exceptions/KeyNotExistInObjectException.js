class KeyNotExistInObjectException extends Error {
    constructor(message) {
      super(message);
      this.name = 'KeyNotExistInObjectException';
    }
  }

  
module.exports = KeyNotExistInObjectException;