import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GalleryImageDetails from './GalleryImageDetails';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const props = {
  image: {
    cloudinaryUrl: 'test.com/test.jpg',
    cloudinaryPublicId: '1234'
  },
  description: 'test'
};

describe('(Component) GalleryImageDetails', () => {
  beforeEach(() => {
    wrapper = shallow(
      <GalleryImageDetails {...props} />
    );
  });

  describe('rendering', () => {
    it('should render an image', () => {
      const actual = wrapper.containsMatchingElement(
        <img
          src={props.image.cloudinaryUrl}
          alt={props.description}
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render description', () => {
      const actual = wrapper.containsAllMatchingElements([
        <h4>Description</h4>,
        <p>{props.description}</p>
      ]);
      expect(actual).to.equal(true);
    });

  });
});
