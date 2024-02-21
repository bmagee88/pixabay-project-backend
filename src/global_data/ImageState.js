// globalData.js
class ImageState {
    constructor() {
      this.data = {
      };
    }
  
    getImages() {
      return this.data;
    }

    getKey(key){
      return this.data[key]
    }
  
    setImages(key, value) {
      this.data[key] = value;
    }
  }
  
  module.exports = new ImageState();
  