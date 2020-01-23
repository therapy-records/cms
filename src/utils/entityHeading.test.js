import entityHeading from './entityHeading';

describe('(Utils) entityHeading', () => {

  it('should return `heading` when provided', () => {
    const mockEntity = {
      heading: 'test',
      about: '<p>test</p>'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.heading);
  });

  it('should return `title` when provided', () => {
    const mockEntity = {
      heading: '',
      title: 'testing',
      about: '<p>test</p>'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.title);
  });

  it('should return `title` when provided', () => {
    const mockEntity = {
      heading: '',
      title: '',
      name: 'testing',
      about: '<p>test</p>'
    };
    const result = entityHeading(mockEntity);
    expect(result).to.eq(mockEntity.name);
  });


});
