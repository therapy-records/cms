import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import GalleryHomeContent from './GalleryHomeContent';
import GalleryListItem from './GalleryListItem';
import List from '../../../components/List';
import { MOCK_GET_GALLERY } from '../../../mocks/gallery.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_GALLERY
];

describe('(Component) GalleryHomeContent', () => {
  let wrapper,
    props = {
      listItems: mocks[0].result.data.gallery
    };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <GalleryHomeContent {...props} />
      </BrowserRouter>
    );
  });

  describe('<PageHeader />', () => {
    let pageHeader;

    beforeEach(() => {
      pageHeader = wrapper.find('PageHeader');
    });

    it('should render with correct props', () => {
      expect(pageHeader.length).to.eq(1);
      expect(pageHeader.prop('heading')).to.eq('Gallery 🌻');
      expect(pageHeader.prop('entityCollection')).to.eq('gallery');
      expect(pageHeader.prop('renderCreateButton')).to.eq(true);
      expect(pageHeader.prop('bespokeButton')).to.be.an('object');
      expect(pageHeader.prop('createButtonCopy')).to.eq('Upload');
    });

    it('should render a bespokeButton prop with correct copy', () => {
      const button = wrapper.find('button').first();
      expect(button.text()).to.eq('Change order');
    });

  });

  it('should render <List />', () => {
    const actual = wrapper.containsMatchingElement(
      <List
        data={props.listItems}
        route='gallery'
        columns
        columnnsPerRow={4}
        listItemComponent={GalleryListItem}
      />
    );
    expect(actual).to.equal(true);
  });

});
