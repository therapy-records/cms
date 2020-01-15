import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COLLABORATOR } from '../../../queries';
import { DELETE_COLLABORATOR } from '../../../mutations';
import CollaboratorView from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import StickyNew from '../../../components/StickyNew';
import Collaborator from './Collaborator';

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
  },
  {
    request: {
      query: DELETE_COLLABORATOR,
      variables: { id: '1234' }
    },
    result: {
      data: {
        _id: '1234'
      }
    }
  }
];

describe('(Component) CollaboratorView', () => {
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
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <h2>{mocks[0].result.data.collaborator.name}</h2>
        );
        expect(actual).to.equal(true);
      });
    });
    
    it('should render <ArticleHeader />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.prop('baseUrl')).to.eq('/collaborators');
        expect(articleHeader.prop('article')).to.deep.eq({});
        expect(articleHeader.prop('onDeleteArticle')).to.be.a('function');
        expect(articleHeader.prop('heading')).to.eq(mocks[0].result.data.collaborator.name);
        expect(articleHeader.prop('showDeleteButton')).to.eq(true);
      });
    });

    it('should render <Collaborator />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          <Collaborator {...mocks[0].result.data.collaborator} />
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
            <CollaboratorView {...props} />
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
            <CollaboratorView {...props} />
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
