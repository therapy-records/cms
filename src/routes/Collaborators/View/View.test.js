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
          _id: 'test',
          name: 'test',
          about: '<p>test</p>',
          avatarUrl: 'test.com',
          urls: [],
          collabOn: 'test' 
        }
      }
    }
  }
];

describe('(Component) CollaboratorView - Home', () => {
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

    it('should render a Link to delete', async() => {
      await wait(0); // wait for response
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <Link to='/test'>Edit</Link>
      );
      expect(actual).to.equal(true);
    });

    it('should render an image', async() => {
      await wait(0); // wait for response
      wrapper.update();
      const actual = wrapper.containsMatchingElement(
        <img
          src={mocks[0].result.data.collaborator.avatarUrl}
          alt={mocks[0].result.data.collaborator.name}
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render about html', async() => {
      await wait(0); // wait for response
      wrapper.update();
      console.log('YOOOO \n', wrapper.debug());
      const actual = wrapper.containsMatchingElement(
        <div dangerouslySetInnerHTML={{__html: mocks[0].result.data.collaborator.about}} />
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
