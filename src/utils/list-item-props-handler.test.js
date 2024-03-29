import moment from 'moment';
import listItemPropsHandler from './list-item-props-handler';
import entityHeading from './entityHeading';
import { getFirstImageInArticle } from  './news';

describe('(Utils) list-item-props-handler', () => {
  const mockItem = {
    title: 'testing',
    _id: '1234',
    author: 'test',
    image: {
      cloudinaryUrl: 'test.com/image.jpg',
      cloudinaryPublicId: '1234'
    },
    date: 'test date',
    releaseDate: 'release date',
    excerpt: 'testing',
    externalLink: 'test.com',
    ticketsUrl: 'tickets.com',
    category: 'Mock category name'
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
      author: mockItem.author,
      description: mockItem.excerpt,
      imageUrl: mockItem.image.cloudinaryUrl,
      date: mockItem.date,
      releaseDate: mockItem.releaseDate,
      route: 'test',
      cardDesign: true,
      isDraggable: true,
      externalLink: mockItem.externalLink,
      category: mockItem.category
    };

    expect(result).to.deep.eq(expected);
  });

  describe('with an avatar object instead of image', () => {
    it('should return avatar.cloudinaryUrl', () => {
      const mockItemWithAvatar = {
        ...mockItem,
        image: {},
        avatar: {
          cloudinaryUrl: 'test.com/image.jpg',
          cloudinaryPublicId: '1234'
        }
      };

      const result = listItemPropsHandler({
        item: mockItemWithAvatar,
        index: 0,
        route: 'test',
        itemsHaveMultipleImages: false
      });

      expect(result.imageUrl).to.eq(mockItemWithAvatar.avatar.cloudinaryUrl);
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

  describe('when there is no excerpt and there is venue, location and date', () => {
    it('should return a formatted description', () => {
      const mockVenue = 'test venue';
      const mockLocation = 'London, UK';
      const mockDate = '2020-03-10T11:17:02.883Z';

      const result = listItemPropsHandler({
        item: {
          location: mockLocation,
          venue: mockVenue,
          date: mockDate
        }
      });

      const expected = `${mockVenue}, ${mockLocation}, ${moment(new Date(mockDate)).format('LT')}`;

      expect(result.description).to.eq(expected);
    });
  });

});
