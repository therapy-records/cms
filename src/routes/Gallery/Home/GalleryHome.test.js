import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

// import Gallery from './index';
import GalleryHome from './GalleryHome';
// import GalleryHomeContent from './GalleryHomeContent';
import { GET_GALLERY } from '../../../queries';

import { MOCK_GET_GALLERY } from '../../../mocks/gallery.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_GALLERY
];

describe('(Component) Gallery - Home', () => {
  let wrapper;

  const actions = async (wrapper, _actions) => {
    await act(async () => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <GalleryHome />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(GET_GALLERY);
    expect(queryContainer.prop('entityName')).to.eq('gallery');
  });

  it('should render <GalleryHomeContent /> from <QueryContainer /> render prop', async () => {
    await actions(wrapper, () => {
      wrapper.update();

      const galleryHomeContent = wrapper.find('GalleryHomeContent');
      expect(galleryHomeContent.length).to.eq(1);
      expect(galleryHomeContent.prop('listItems')).to.deep.eq(mocks[0].result.data.gallery);
    });
  });

});
