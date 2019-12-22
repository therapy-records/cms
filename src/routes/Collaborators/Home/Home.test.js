import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, Link } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import Collaborators from './index';
import { GET_COLLABORATORS } from '../../../queries';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';
import List from '../../../components/List';

Enzyme.configure({ adapter: new Adapter() });

let mocks = [
  {
    request: {
      query: GET_COLLABORATORS
    },
    result: {
      data: {
        collaborators: [
          { _id: 'abc1', name: 'test', avatarUrl: 'test.com' },
          { _id: 'abc2', name: 'testing', avatarUrl: 'test.com' }
        ]
      }
    }
  }
];

describe('(Component) Collaborators - Home', () => {
  let wrapper;

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Collaborators />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Collaborators 🌈</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render a link to create', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='collaborators/create'>Create</Link>
      );
      expect(actual).to.equal(true);
    });

    it('should render <List />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <List
            data={mocks[0].result.data.collaborators}
            route='collaborators'
            columns
          />
        );
        expect(actual).to.equal(true);
      });
    });

  });

  describe('when the graphQL query is loading', () => {
    it('should render <LoadingSpinner />', async() => {
      mocks = [{
        request: {
          query: GET_COLLABORATORS
        }
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Collaborators />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        const actual = wrapper.containsMatchingElement(
          <LoadingSpinner
            active
            fullScreen
          />
        );
        expect(actual).to.equal(true);
      });
    });
  });
  
  describe('when the graphQL query errors', () => {
    it('should render <ErrorMessage />', async() => {
      mocks = [{
        request: {
          query: GET_COLLABORATORS
        },
        error: new Error('Something went wrong')
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Collaborators />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <ErrorMessage />
        );
        expect(actual).to.equal(true);
      });
    });
  });

});
