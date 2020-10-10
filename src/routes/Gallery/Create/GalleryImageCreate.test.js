import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import GalleryImageCreate from './index';
import PageHeader from '../../../components/PageHeader';
import GalleryForm from '../../../components/GalleryForm';
import FormFields from '../../../formFields';
import { CREATE_GALLERY_IMAGE } from '../../../mutations';
import {
  GET_COLLABORATORS_NAMES,
  GET_GALLERY
} from '../../../queries';
import { mapFields } from '../../../utils/form-field-mappings';

import { MOCK_GET_COLLABORATORS_NAMES } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_COLLABORATORS_NAMES
];

describe('(Component) GalleryImageCreate', () => {
  let wrapper;

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
          <GalleryImageCreate />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const singleEntityContainer = wrapper.find('QueryContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('query')).to.eq(GET_COLLABORATORS_NAMES);
    expect(singleEntityContainer.prop('entityName')).to.eq('collaborators');
  });

  it('should render <PageHeader /> from <QueryContainer /> render prop', async () => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <PageHeader heading='Upload Gallery Images 🌻' />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render <GalleryForm /> from <QueryContainer /> render prop', async () => {
    await actions(wrapper, () => {
      wrapper.update();
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
