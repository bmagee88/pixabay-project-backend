
/** caches images fetch from api by key value on subject */
class ImageState {
    constructor() {
      this.data = {
      };
    }
  
    /**Gets entire cache */
    getImages() {
      return this.data;
    }

    /**gets cache by key */
    getKey(key){
      return this.data[key]
    }
  
    /**sets the value on a key in cache */
    setImages(key, value) {
      this.data[key] = value;
    }
  }
  
  module.exports = new ImageState();
  