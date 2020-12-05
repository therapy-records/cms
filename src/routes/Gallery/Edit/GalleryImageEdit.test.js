import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import GalleryImageEdit from './GalleryImageEdit';
import {
  GET_GALLERY_IMAGE,
  GET_GALLERY
} from '../../../queries';
import {
  EDIT_GALLERY_IMAGE,
  DELETE_GALLERY_IMAGE
} from '../../../mutations';
import GalleryForm from '../../../components/GalleryForm';
import FormFields from '../../../formFields';
import mapFieldsWithValues from '../../../utils/form-field-mappings';
import { MOCK_GET_GALLERY_IMAGE } from '../../../mocks/gallery.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_GALLERY_IMAGE
];

describe('(Component) GalleryImageEdit', () => {
  let wrapper,
    props = {
      match: {
        params: {
          id: '1234'
        }
      },
      isEdit: true
    };

  const actions = async (wrapper, _actions) => {
    await act(async () => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <GalleryImageEdit {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/gallery');
    expect(singleEntityContainer.prop('entityName')).to.eq('galleryImage');
    expect(singleEntityContainer.prop('entityCollection')).to.eq('gallery');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_GALLERY_IMAGE);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_GALLERY_IMAGE);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Gallery'
    });
    expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
      cacheQuery: GET_GALLERY,
      responseObjName: 'deleteGalleryImage'
    });
    expect(singleEntityContainer.prop('isEdit')).to.eq(props.isEdit);
  });

  it('should render <GalleryForm /> from <SingleEntityContainer /> render prop ', async () => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <GalleryForm
          fields={mapFieldsWithValues(
            new FormFields().gallerySingle,
            { image: mocks[0].result.data.galleryImage }
          )}
          mutation={EDIT_GALLERY_IMAGE}
          id={props.match.params.id}
          refetchQueries={[
            { query: GET_GALLERY }
          ]}
          isEdit
        />
      );
      expect(actual).to.equal(true);
    });
  });

});
