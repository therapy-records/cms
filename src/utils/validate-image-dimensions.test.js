import validateImageDimensions, {
  isValid,
  validationMessage
} from './validate-image-dimensions';

describe('(Utils) validate-image-dimensions', () => {
  describe('isValid', () => {
    it('should return false when width is too small', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 100, height: 200 };

      const result = isValid(minDimensions, mockImage);
      expect(result).to.eq(false);
    });

    it('should return false when height is too small', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 200, height: 100 };

      const result = isValid(minDimensions, mockImage);
      expect(result).to.eq(false);
    });

    it('should return true when width & height are not below minDimensions', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 201, height: 201 };

      const result = isValid(minDimensions, mockImage);
      expect(result).to.eq(true);
    });
  });

  describe('validationMessage', () => {
    it('should return string when width is too small', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 100, height: 200 };

      const result = validationMessage(minDimensions, mockImage);
      expect(result).to.eq(
        `Width is too small (${mockImage.width}px).`
      );
    });

    it('should return string when height is too small', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 200, height: 100 };

      const result = validationMessage(minDimensions, mockImage);
      expect(result).to.eq(
        `Height is too small (${mockImage.height}px).`
      );
    });

    it('should return string when width & height is too small', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 100, height: 100 };

      const result = validationMessage(minDimensions, mockImage);
      expect(result).to.eq(
        `Width is too small (${mockImage.width}px). Height is too small (${mockImage.height}px).`
      );
    });

    it('should return null when dimensions are above minDimensions', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 201, height: 201 };

      const result = validationMessage(minDimensions, mockImage);
      expect(result).to.eq(null);
    });
  });

  describe('validateImageDimensions', () => {
    it('should return true when valid', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 201, height: 201 };

      const result = validateImageDimensions(minDimensions, mockImage);
      expect(result).to.deep.eq({
        isValid: true
      });
    });

    it('should return validationMessage when invalid', () => {
      const minDimensions = { width: 200, height: 200 }
      const mockImage = { width: 199, height: 199 };

      const result = validateImageDimensions(minDimensions, mockImage);
      expect(result).to.deep.eq({
        isValid: false,
        message: validationMessage(minDimensions, mockImage)
      });
    });
  });
});
