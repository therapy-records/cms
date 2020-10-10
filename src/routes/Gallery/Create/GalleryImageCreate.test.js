import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GalleryImageCreate from './index';
import PageHeader from '../../../components/PageHeader';
import GalleryForm from '../../../components/GalleryForm';
import FormFields from '../../../formFields';
import { CREATE_GALLERY_IMAGE } from '../../../mutations';
import { GET_GALLERY } from '../../../queries';
import { mapFields } from '../../../utils/form-field-mappings';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GalleryImageCreate', () => {
  let wrapper;

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<GalleryImageCreate />);
    });

    it('should render <PageHeader />', () => {
      const actual = wrapper.containsMatchingElement(
        <PageHeader heading='Upload Gallery Images 🌻' />
      );
      expect(actual).to.equal(true);
    });


    it('should render <GalleryForm />', () => {
      const actual = wrapper.containsMatchingElement(
        <GalleryForm
          fields={mapFields(new FormFields().gallery)}
          mutation={CREATE_GALLERY_IMAGE}
          refetchQueries={[
            { query: GET_GALLERY }
          ]}
          baseUrl='/gallery'
        />
      );
      expect(actual).to.equal(true);
    });

  });

});
