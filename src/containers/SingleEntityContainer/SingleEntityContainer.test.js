import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import {
  GET_COLLABORATOR,
  GET_COLLABORATORS
} from '../../queries';
import { DELETE_COLLABORATOR } from '../../mutations';
import SingleEntityContainer from './index';
import CollaboratorDetails from '../../components/CollaboratorDetails';
import {
  MOCK_GET_COLLABORATOR,
  MOCK_DELETE_COLLABORATOR
} from '../../mocks/collaborators.mock'

Enzyme.configure({ adapter: new Adapter() });

const mocks = [
  MOCK_GET_COLLABORATOR,
  MOCK_DELETE_COLLABORATOR
];

describe('(Container) SingleEntityContainer', () => {
  let wrapper,
    props = {
      baseUrl: '/collaborators',
      entityName: 'collaborator',
      entityCollection: 'collaborators',
      id: '1234',
      render: CollaboratorDetails,
      query: GET_COLLABORATOR,
      isEdit: true,
      mutation: DELETE_COLLABORATOR,
      mutationSuccessCopy: {
        success: 'Successfully deleted.',
        homeLink: 'Go to Collaborators'
      },
      mutationCacheUpdate: {
        readQuery: GET_COLLABORATORS,
        responseObjName: 'deleteCollaborator'
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
          <SingleEntityContainer {...props} />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should render <QueryContainer />', () => {
    const queryContainer = wrapper.find('QueryContainer');
    expect(queryContainer.length).to.eq(1);
    expect(queryContainer.prop('query')).to.eq(props.query);
    expect(queryContainer.prop('queryVariables')).to.deep.eq({
      id: props.id
    });
    expect(queryContainer.prop('entityName')).to.eq('collaborator');
  });

  describe('with graphQL query success', () => {

    it('should render <MutationContainer />', async() => {
      await actions(wrapper, () => {
        wrapper.update();

        const mutationContainer = wrapper.find('MutationContainer');
        expect(mutationContainer.length).to.eq(1);
        expect(mutationContainer.prop('mutation')).to.eq(props.mutation);
        expect(mutationContainer.prop('mutationVariables')).to.deep.eq({
          id: props.id
        });
        expect(mutationContainer.prop('baseUrl')).to.eq(props.baseUrl);
        expect(mutationContainer.prop('successCopy')).to.deep.eq(props.mutationSuccessCopy);
        expect(mutationContainer.prop('entityCollection')).to.deep.eq(props.entityCollection);
      });
    });

    it('should render <SingleEntityContent />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const singleEntityContent = wrapper.find('SingleEntityContent');
        expect(singleEntityContent.length).to.eq(1);
        expect(singleEntityContent.prop('baseUrl')).to.eq(props.baseUrl);
        expect(singleEntityContent.prop('entityCollection')).to.deep.eq(props.entityCollection);
        expect(singleEntityContent.prop('data')).to.deep.eq(mocks[0].result.data[props.entityName]);
        expect(singleEntityContent.prop('executeMutation')).to.be.a('function');
        expect(singleEntityContent.prop('render')).to.eq(props.render);
        expect(singleEntityContent.prop('isEdit')).to.eq(props.isEdit);
        expect(singleEntityContent.prop('renderDeleteButton')).to.eq(true);
      });
    });

  });

});
