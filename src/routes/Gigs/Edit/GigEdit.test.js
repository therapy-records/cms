import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import GigEdit from './GigEdit';
import {
  GET_GIG,
  GET_GIGS
} from '../../../queries';
import {
  EDIT_GIG,
  DELETE_GIG
} from '../../../mutations';
import GigForm from '../../../components/GigForm';
import FormFields from '../../../formFields';
import mapFieldsWithValues from '../../../utils/form-field-mappings';
import { MOCK_GET_GIG } from '../../../mocks/gigs.mock';
Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_GIG
];

describe('(Component) GigEdit', () => {
  let wrapper;
  const props = {
    match: {
      params: {
        id: '1234'
      }
    },
    isEdit: true
  };

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <GigEdit {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/gigs');
    expect(singleEntityContainer.prop('entityName')).to.eq('gig');
    expect(singleEntityContainer.prop('entityCollection')).to.eq('gigs');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_GIG);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_GIG);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Gigs'
    });
    expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
      cacheQuery: GET_GIG,
      responseObjName: 'deleteGig'
    });
    expect(singleEntityContainer.prop('isEdit')).to.eq(props.isEdit);
  });

  it('should render <GigForm /> from <SingleEntityContainer /> render prop ', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <GigForm
          mutation={EDIT_GIG}
          fields={mapFieldsWithValues(
            new FormFields().gig,
            mocks[0].result.data.gig
          )}
          id={props.match.params.id}
          refetchQueries={[
            { query: GET_GIG },
            {
              query: GET_GIGS,
              variables: {
                id: props.match.params.id
              }
            }
          ]}
          isEdit
        />
      );
      expect(actual).to.equal(true);
    });
  });
});
