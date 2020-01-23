import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import CollaboratorEdit from './CollaboratorEdit';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import {
  EDIT_COLLABORATOR,
  DELETE_COLLABORATOR
} from '../../../mutations';
import CollaboratorForm from '../../../components/CollaboratorForm';
import { MOCK_GET_COLLABORATOR } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_COLLABORATOR
];

describe('(Component) CollaboratorEdit', () => {
  let wrapper,
    props = {
      match: {
        params: {
          id: '1234'
        }
      }
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
          <CollaboratorEdit {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/collaborators');
    expect(singleEntityContainer.prop('entityName')).to.eq('collaborator');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_COLLABORATOR);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_COLLABORATOR);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Collaborators'
    });
  });

  it('should render <CollaboratorForm /> from <SingleEntityContainer /> render prop ', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <CollaboratorForm
          mutation={EDIT_COLLABORATOR}
          collabValues={mocks[0].result.data.collaborator}
          id={props.match.params.id}
          refetchQueries={[
            { query: GET_COLLABORATORS }
          ]}
          isEditForm
        />
      );
      expect(actual).to.equal(true);
    });
  });

});
