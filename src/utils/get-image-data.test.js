import {
  imageDataObj,
  getImageData,
  getImageDimensions,
  getImageBase64String
} from './get-image-data';

describe('(Utils) getImageData', () => {
  describe('imageDataObj', () => {
    it('should return an object from given image data', () => {
      const mockImage = {
        width: 100,
        height: 200,
        src: 'someBase64String'
      };
      const result = imageDataObj(mockImage)
      expect(result).to.deep.eq({
        width: mockImage.width,
        height: mockImage.height,
        base64String: mockImage.src
      });
    });
  });

  describe('getImageData', () => {
    it('should be defined', () => {
      expect(getImageData).to.be.a('function');
    });
  });

  describe('getImageDimensions', () => {
    it('should be defined', () => {
      expect(getImageDimensions).to.be.a('function');
    });
  });

  describe('getImageBase64String', () => {
    it('should be defined', () => {
      expect(getImageBase64String).to.be.a('function');
    });
  });
});
