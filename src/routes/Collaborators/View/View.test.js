import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import wait from 'waait';
import { BrowserRouter, Link } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COLLABORATOR } from '../../../queries';
import CollaboratorView from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import Collaborator from './Collaborator';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: GET_COLLABORATOR,
      variables: { id: 'test' }
    },
    result: {
      data: {
        collaborator: {
          name: 'test',
          about: '<p>test</p>',
          avatarUrl: 'test.com',
          urls: [],
          collabOn: []
        }
      }
    }
  }
];

describe('(Component) CollaboratorView', () => {
  let wrapper,
      props = {
        match: {
          params: {
            id: 'test'
          }
        }
      };

  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <CollaboratorView {...props} />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render a page title', async() => {
      await wait(0); // wait for response
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <h2>{mocks[0].result.data.collaborator.name}</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render a button to delete', async() => {
      await wait(0); // wait for response
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <button>Delete</button>
      );
      expect(actual).to.equal(true);
    });

    it('should render a Link to edit', async() => {
      await wait(0); // wait for response
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <Link to={`/collaborators/${props.match.params.id}/edit`}>Edit</Link>
      );
      expect(actual).to.equal(true);
    });

    it('should render <Collaborator />', async() => {
      await wait(0); // wait for response
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <Collaborator {...mocks[0].result.data.collaborator}/>
      );
      expect(actual).to.equal(true);
    });

  });

  describe('when the graphQL query is loading', () => {
    it('should render <LoadingSpinner />', () => {
      mocks = [{
        request: {
          query: GET_COLLABORATOR
        }
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <CollaboratorView {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner
          active
          fullScreen
        />
      );
      expect(actual).to.equal(true);

    });
  });

  describe('when the graphQL query errors', () => {
    it('should render <ErrorMessage />', async() => {
      mocks = [{
        request: {
          query: GET_COLLABORATOR
        },
        error: new Error('Something went wrong')
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <CollaboratorView {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await wait(0); // wait for response
      wrapper.update();

      const actual = wrapper.containsMatchingElement(
        <ErrorMessage />
      );
      expect(actual).to.equal(true);

    });
  });

});
