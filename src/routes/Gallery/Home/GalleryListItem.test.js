import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import GalleryListItem from './GalleryListItem';
import { expect } from 'chai';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GalleryListItem', () => {
  let wrapper,
    props = {
      _id: 'abcd1234',
      image: {
        cloudinaryUrl: 'test.com/test.jpg',
        cloudinaryPublicId: '1234',
      },
      description: 'My test image'
    };

  beforeEach(() => {
    wrapper = shallow(
      <GalleryListItem {...props} />
    );
  });

  it('should render an li', () => {
    const listItem = wrapper.find('li');
    expect(listItem.length).to.eq(1);
  });

  it('should render a <Link /> with image', () => {
    const actual = wrapper.containsMatchingElement(
      <Link
        to={`/gallery/${props._id}`}
      >
        <img src={props.image.cloudinaryUrl} alt={props.description} />
      </Link>
    );
    expect(actual).to.eq(true);
  });

});
