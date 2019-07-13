import {
  getArticlesFirstImageUrl,
  removeEmptyImageUrls
} from './news';

describe('(Utils) form', () => {
  const mockArticle = {
    sections: [
      {
        images: [
          { url: 'http://testing.com' }
        ]
      }
    ]
  };

  describe('getArticlesFirstImageUrl', () => {

    it('should return the first url', () => {
      const result = getArticlesFirstImageUrl(mockArticle);
      const expected = mockArticle.sections[0].images[0].url;
      expect(result).to.eq(expected);      
    });

    describe('when the article does not have an image', () => {
    
      describe('when a `placeholderFallback` argument is passed', () => {
        it('should return a placeholder image', () => {
          const result = getArticlesFirstImageUrl({}, true);
          const expected = 'http://via.placeholder.com/100x137/C8C8C8/777?text=No+image&color=EEEEEE';
          expect(result).to.eq(expected);
        });
      });
    
      describe('when a `placeholderFallback` argument is NOT passed', () => {
        it('should return null', () => {
          const result = getArticlesFirstImageUrl({});
          expect(result).to.eq(null);
        });
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
