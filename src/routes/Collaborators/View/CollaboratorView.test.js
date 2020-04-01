import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import CollaboratorView from './CollaboratorView';
import CollaboratorDetails from '../../../components/CollaboratorDetails';
import { MOCK_GET_COLLABORATOR } from '../../../mocks/collaborators.mock';

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
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

  it('should render <SingleEntityContainer />', () => {
    const singleEntityContainer = wrapper.find('SingleEntityContainer');
    expect(singleEntityContainer.length).to.eq(1);
    expect(singleEntityContainer.prop('baseUrl')).to.eq('/collaborators');
    expect(singleEntityContainer.prop('entityName')).to.eq('collaborator');
    expect(singleEntityContainer.prop('entityCollection')).to.eq('collaborators');
    expect(singleEntityContainer.prop('id')).to.eq(props.match.params.id);
    expect(singleEntityContainer.prop('query')).to.eq(GET_COLLABORATOR);
    expect(singleEntityContainer.prop('mutation')).to.eq(DELETE_COLLABORATOR);
    expect(singleEntityContainer.prop('mutationSuccessCopy')).to.deep.eq({
      success: 'Successfully deleted.',
      homeLink: 'Go to Collaborators'
    });
    expect(singleEntityContainer.prop('mutationCacheUpdate')).to.deep.eq({
      cacheQuery: GET_COLLABORATORS,
      responseObjName: 'deleteCollaborator'
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
