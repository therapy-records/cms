import {
  getFirstImageInArticle,
  removeEmptyImageUrls
} from './news';

describe('(Utils) form', () => {
  const mockArticle = {
    sections: [
      {
        images: [
          { url: '' }
        ]
      },
      {
        images: [
          { url: 'http://testing.com' }
        ]
      }
    ]
  };

  describe('getFirstImageInArticle', () => {
    it('should return the first section with an image url', () => {
      const result = getFirstImageInArticle(mockArticle);
      const expected = mockArticle.sections[1].images[0].url;
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
            { url: 'test.jpg' },
            { url: '' },
            { url: 'test2.jpg' }
          ]
        },
        {
          copy: 'test2',
          images: [
            { url: 'test.jpg' },
            { url: 'test2.jpg' },
            { url: '' }
          ]
        }
      ]);
      const expected = [
        {
          copy: 'test',
          images: [
            { url: 'test.jpg' },
            { url: 'test2.jpg' }
          ]
        },
        {
          copy: 'test2',
          images: [
            { url: 'test.jpg' },
            { url: 'test2.jpg' },
          ]
        }
      ];
      expect(result).to.deep.eq(expected);
    });

  });

});
