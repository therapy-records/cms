import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GalleryImageDetails from './GalleryImageDetails';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const props = {
  cloudinaryUrl: 'test.com/test.jpg',
  cloudinaryPublicId: '1234',
  description: 'test',
  collaboratorsInImage: [
    { _id: '1234', name: 'Joe Bloggs ' },
    { _id: '5678', name: 'Ben Jones ' }
  ]
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
          src={props.cloudinaryUrl}
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

    it('should render list of collaborators in the image', () => {
      const actual = wrapper.containsAllMatchingElements([
        <h4>Collaborators in image</h4>,
        <li>{props.collaboratorsInImage[0].name}</li>,
        <li>{props.collaboratorsInImage[1].name}</li>
      ]);
      expect(actual).to.equal(true);
    });

  });
});
