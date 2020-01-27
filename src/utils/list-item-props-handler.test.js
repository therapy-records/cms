import listItemPropsHandler from './list-item-props-handler';
import entityHeading from './entityHeading';
import { getFirstImageInArticle } from  './news';

describe('(Utils) list-item-props-handler', () => {
  const mockItem = {
    title: 'testing',
    _id: '1234',
    imageUrl: 'test.com/image.jpg',
    date: 'test date'
  };
  
  it('should return an object with correct properties/values', () => {
    const result = listItemPropsHandler({
      item: mockItem,
      index: 0,
      route: 'test',
      cardDesign: true,
      isDraggable: true
    });

    const expected = {
      index: 0,
      key: mockItem._id,
      _id: mockItem._id,
      title: entityHeading(mockItem),
      imageUrl: mockItem.imageUrl,
      date: mockItem.date,
      route: 'test',
      cardDesign: true,
      isDraggable: true
    }

    expect(result).to.deep.eq(expected);
  });

  describe('when there is no date, but a releaseDate', () => {
    it('should return releaseDate', () => {
      mockItem.date = null;
      mockItem.releaseDate = 'test';

      const result = listItemPropsHandler({
        item: mockItem,
        index: 0,
        route: 'test'
      });
      expect(result.date).to.eq(mockItem.releaseDate)

    });
  });

  describe('with itemsHaveMultipleImages', () => {
    it('should return the first image', () => {
      mockItem.sections = [
        {
          images: [
            { url: 'test.jpg' },
            { url: 'test2.jpg'} 
          ]
        },
        {
          images: [
            { url: 'test2.jpg' },
            { url: 'test3.jpg' }
          ]
        }
      ];

      const result = listItemPropsHandler({
        item: mockItem,
        index: 0,
        route: 'test',
        itemsHaveMultipleImages: true
      });
      expect(result.imageUrl).to.eq(getFirstImageInArticle(mockItem))

    });
  });

});
