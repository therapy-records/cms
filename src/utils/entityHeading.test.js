import entityHeading from './entityHeading';

describe('(Utils) entityHeading', () => {

  it('should return `heading` when provided', () => {
    const mockEntity = {
      heading: 'test'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.heading);
  });

  it('should return `title` when provided', () => {
    const mockEntity = {
      heading: '',
      title: 'testing'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.title);
  });

  it('should return `name` when provided', () => {
    const mockEntity = {
      heading: '',
      title: '',
      name: 'testing'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.name);
  });

  it('should return `author` when provided', () => {
    const mockEntity = {
      heading: '',
      title: '',
      name: '',
      author: 'testing'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.author);
  });

  it('should return `venue` when provided', () => {
    const mockEntity = {
      heading: '',
      title: '',
      name: '',
      author: '',
      venue: 'test'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.venue);
  });

  describe('when there is title and venue', () => {
    it('should return `title` and `venue`', () => {
      const mockEntity = {
        heading: '',
        title: 'mock title',
        name: '',
        author: '',
        venue: 'test'
      };
      const result = entityHeading(mockEntity);
      expect(result).to.eq(`${mockEntity.title} - ${mockEntity.venue}`);
    });
  });

  describe('when there is image object and description', () => {
    it('should return `Gallery` and `description`', () => {
      const mockEntity = {
        heading: '',
        title: '',
        name: '',
        author: '',
        description: 'Test image description',
        image: {
          cloudinaryUrl: 'test.com/test.jpg'
        }
      };
      const result = entityHeading(mockEntity);
      expect(result).to.eq(`Gallery - ${mockEntity.description}`);
    });
  });

});
