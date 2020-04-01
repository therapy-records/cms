import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import PressEdit from './PressEdit';
import {
  GET_PRESS_ARTICLE,
  GET_PRESS
} from '../../../queries';
import {
  EDIT_PRESS,
  DELETE_PRESS
} from '../../../mutations';
import PressForm from '../../../components/PressForm';
import FormFields from '../../../formFields';
import mapFieldsWithValues from '../../../utils/form-field-mappings';
import { MOCK_GET_PRESS_ARTICLE } from '../../../mocks/press.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_PRESS_ARTICLE
];

describe('(Component) PressEdit', () => {
  let wrapper,
    props = {
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
          <PressEdit {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/press');
    expect(singleEntityContainer.prop('entityName')).to.eq('pressArticle');
    expect(singleEntityContainer.prop('entityCollection')).to.eq('press');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_PRESS_ARTICLE);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_PRESS);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Press'
    });
    expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
      cacheQuery: GET_PRESS,
      responseObjName: 'deletePress'
    });
    expect(singleEntityContainer.prop('isEdit')).to.eq(props.isEdit);
  });

  it('should render <PressForm /> from <SingleEntityContainer /> render prop ', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <PressForm
          mutation={EDIT_PRESS}
          fields={mapFieldsWithValues(
            new FormFields().press,
            mocks[0].result.data.pressArticle
          )}
          id={props.match.params.id}
          refetchQueries={[
            { query: GET_PRESS },
            {
              query: GET_PRESS_ARTICLE,
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
