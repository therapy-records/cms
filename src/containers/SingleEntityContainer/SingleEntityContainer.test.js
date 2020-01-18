import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COLLABORATOR } from '../../queries';
import { DELETE_COLLABORATOR } from '../../mutations';
import SingleEntityContainer from './index';
import CollaboratorDetails from '../../components/CollaboratorDetails';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: GET_COLLABORATOR,
      variables: { id: '1234' }
    },
    result: {
      data: {
        collaborator: {
          _id: '1234',
          name: 'test',
          role: 'testing',
          about: '<p>test</p>',
          avatarUrl: 'test.com',
          urls: {
            website: 'test',
            facebook: 'test',
            instagram: 'test',
            twitter: 'test',
            soundcloud: 'test',
            bio: 'test',
            email: 'test@test.com',
            phone: '0123456789',
            other: []
          },
          collabOn: []
        }
      }
    }
  }
];

describe('(Container) SingleEntityContainer', () => {
  let wrapper,
    props = {
      baseUrl: '/collaborators',
      entityName: 'collaborator',
      id: '1234',
      component: CollaboratorDetails,
      query: GET_COLLABORATOR,
      renderEditLink: true
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

    it('should render <SingleEntityContent />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const singleEntityContent = wrapper.find('SingleEntityContent');
        expect(singleEntityContent.length).to.eq(1);
        expect(singleEntityContent.prop('baseUrl')).to.eq(props.baseUrl);
        expect(singleEntityContent.prop('data')).to.deep.eq(mocks[0].result.data[props.entityName]);
        expect(singleEntityContent.prop('component')).to.eq(props.component);
        expect(singleEntityContent.prop('renderEditLink')).to.eq(props.renderEditLink);
      });
    });

    describe('when a mutation is passed through props', () => {

      mocks = [
        ...mocks,
        {
          request: {
            query: DELETE_COLLABORATOR,
            variables: { id: '1234' }
          },
          result: {
            data: {
              deleteCollaborator: {
                _id: '1234'
              }
            }
          }
        }
      ];

      props = {
        ...props,
        mutation: DELETE_COLLABORATOR
      };

      beforeEach(() => {
        wrapper = mount(
          <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
              <SingleEntityContainer {...props} />
            </MockedProvider>
          </BrowserRouter>
        );
      });

      it('should render <MutationContainer />', async() => {
        await actions(wrapper, () => {
          wrapper.update();

          const mutationContainer = wrapper.find('MutationContainer');
          expect(mutationContainer.length).to.eq(1);
          expect(mutationContainer.prop('mutation')).to.eq(props.mutation);
          expect(mutationContainer.prop('mutationVariables')).to.deep.eq({
            id: props.id
          });
          expect(mutationContainer.prop('entityName')).to.eq('collaborator');
          expect(mutationContainer.prop('baseUrl')).to.eq(props.baseUrl);
        });
      });

      it('should render <SingleEntityContent />', async() => {
        await actions(wrapper, () => {
          wrapper.update();
          const singleEntityContent = wrapper.find('SingleEntityContent');
          expect(singleEntityContent.length).to.eq(1);
          expect(singleEntityContent.prop('baseUrl')).to.eq(props.baseUrl);
          expect(singleEntityContent.prop('data')).to.deep.eq(mocks[0].result.data[props.entityName]);
          expect(singleEntityContent.prop('executeMutation')).to.be.a('function');
          expect(singleEntityContent.prop('component')).to.eq(props.component);
          expect(singleEntityContent.prop('renderEditLink')).to.eq(props.renderEditLink);
          expect(singleEntityContent.prop('renderDeleteButton')).to.eq(true);
        });
      });

    });

  });

});
