import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import QueryContainer from './QueryContainer';
import { GET_COLLABORATOR } from '../../queries'
import LoadingSpinner from '../../components/LoadingSpinner';
import StickyNew from '../../components/StickyNew';
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

describe('(Container) QueryContainer', () => {
  let wrapper,
    props = {
      entityName: 'collaborator',
      query: GET_COLLABORATOR,
      queryVariables: {
        id: '1234'
      },
      render: renderProps => (
        <CollaboratorDetails {...renderProps} />
      )
    };

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  }

  describe('when there are no errors', () => {
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <QueryContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render a component passed through props.render with query data/props', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <CollaboratorDetails {...mocks[0].result.data[props.entityName]} />
        );
        expect(actual).to.equal(true);
      });
    });
  });

  describe('when the graphQL query is loading', () => {

    it('should render <LoadingSpinner />', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <QueryContainer {...props} />
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
          query: GET_COLLABORATOR
        },
        error: new Error('Something went wrong')
      }];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <QueryContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <StickyNew>
            <p>Sorry, something has gone wrong.</p>
          </StickyNew>
        );
        expect(actual).to.equal(true);
      });
    });
  });

});
