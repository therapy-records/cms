import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  GET_GALLERY_IMAGE_WITH_COLLAB_NAMES,
  GET_GALLERY,
} from '../../../queries';
import { DELETE_GALLERY_IMAGE } from '../../../mutations';
import GalleryImageView from './GalleryImageView';
import GalleryImageDetails from '../../../components/GalleryImageDetails';
import { MOCK_GET_GALLERY_IMAGE_WITH_COLLAB_NAMES } from '../../../mocks/gallery.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_GALLERY_IMAGE_WITH_COLLAB_NAMES
];

describe('(Component) GalleryImageView', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        id: '1234'
      }
    }
  };

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
          <GalleryImageView {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/gallery');
    expect(singleEntityContainer.prop('entityName')).to.eq('galleryImageWithCollaboratorNames');
    expect(singleEntityContainer.prop('entityCollection')).to.eq('gallery');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_GALLERY_IMAGE_WITH_COLLAB_NAMES);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_GALLERY_IMAGE);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Gallery'
    });
    expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
      cacheQuery: GET_GALLERY,
      responseObjName: 'deleteGalleryImage'
    });
  });

  it('should render <GalleryImageDetails /> from <SingleEntityContainer /> render prop ', async () => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <GalleryImageDetails {...mocks[0].result.data.galleryImageWithCollaboratorNames} />
      );
      expect(actual).to.equal(true);
    });
  });

});
