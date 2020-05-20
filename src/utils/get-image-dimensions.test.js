import getImageDimensions, { imageDataObj } from './get-image-dimensions';

describe('(Utils) getImageDimensions', () => {
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

  describe('getImageDimensions', () => {
    it('should be defined', () => {
      expect(getImageDimensions).to.be.a('function');
    });
  });
});
