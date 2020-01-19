import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COLLABORATOR } from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import CollaboratorView from './CollaboratorView';
import SingleEntityContainer from '../../../containers/SingleEntityContainer';
import CollaboratorDetails from '../../../components/CollaboratorDetails';
import { MOCK_GET_COLLABORATOR } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  MOCK_GET_COLLABORATOR
];

describe('(Component) CollaboratorView', () => {
  let wrapper;
  const props = {
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
  };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <CollaboratorView {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <SingleEntityContainer />', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <SingleEntityContainer
          baseUrl='/collaborators'
          entityName='collaborator'
          id={props.match.params.id}
          query={GET_COLLABORATOR}
          mutation={DELETE_COLLABORATOR}
          renderEditLink
        />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render <CollaboratorDetails /> from <SingleEntityContainer /> render prop ', async() => {
    await actions(wrapper, () => {
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <CollaboratorDetails {...mocks[0].result.data.collaborator} />
      );
      expect(actual).to.equal(true);
    });
  });

});
