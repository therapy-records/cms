import {
  getFirstImageInArticle,
  removeEmptyImageUrls
} from './news';

describe('(Utils) form', () => {
  const mockArticle = {
    sections: [
      {
        images: [
          { cloudinaryUrl: '' }
        ]
      },
      {
        images: [
          { cloudinaryUrl: 'http://testing.com' }
        ]
      }
    ]
  };

  describe('getFirstImageInArticle', () => {
    it('should return the first section with an image url', () => {
      const result = getFirstImageInArticle(mockArticle);
      const expected = mockArticle.sections[1].images[0].cloudinaryUrl;
      expect(result).to.eq(expected);      
    });

    describe('when the article does not have any images', () => {
      it('should return a placeholder image', () => {
        const result = getFirstImageInArticle({}, true);
        const expected = 'https://via.placeholder.com/150x137/EEE/999?text=No+image&color=EEEEEE';
        expect(result).to.eq(expected);
      });
    });
  });

  describe('removeEmptyImageUrls', () => {

    it('should return an array of objects without empty url strings in child images array', () => {
      const result = removeEmptyImageUrls([
        {
          copy: 'test',
          images: [
            { cloudinaryUrl: 'test.jpg' },
            { cloudinaryUrl: '' },
            { cloudinaryUrl: 'test2.jpg' }
          ]
        },
        {
          copy: 'test2',
          images: [
            { cloudinaryUrl: 'test.jpg' },
            { cloudinaryUrl: 'test2.jpg' },
            { cloudinaryUrl: '' }
          ]
        }
      ]);
      const expected = [
        {
          copy: 'test',
          images: [
            { cloudinaryUrl: 'test.jpg' },
            { cloudinaryUrl: 'test2.jpg' }
          ]
        },
        {
          copy: 'test2',
          images: [
            { cloudinaryUrl: 'test.jpg' },
            { cloudinaryUrl: 'test2.jpg' },
          ]
        }
      ];
      expect(result).to.deep.eq(expected);
    });

  });

});
