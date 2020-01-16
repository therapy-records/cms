import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COLLABORATOR } from '../../queries';
import { DELETE_COLLABORATOR } from '../../mutations';
import SingleEntityContainer from './index';
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

describe('(Container) SingleEntityContainer', () => {
  let wrapper,
    props = {
      baseUrl: '/collaborators',
      entityName: 'collaborator',
      id: '1234',
      component: CollaboratorDetails,
      query: GET_COLLABORATOR,
      mutation: DELETE_COLLABORATOR,
      renderEditLink: true
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
            <SingleEntityContainer {...props} />
          </MockedProvider>
        </BrowserRouter>
      );
    })

    it('should render <ArticleHeader />', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.prop('baseUrl')).to.eq(props.baseUrl);
        expect(articleHeader.prop('article')).to.deep.eq({
          _id: mocks[0].result.data[props.entityName]._id
        });
        expect(articleHeader.prop('heading')).to.eq(mocks[0].result.data[props.entityName].name);
        expect(articleHeader.prop('showDeleteButton')).to.eq(true);
        expect(articleHeader.prop('onDeleteArticle')).to.be.a('function');
        expect(articleHeader.prop('showEditButton')).to.eq(props.renderEditLink);
      });
    });

    it('should render component from props with data from query', async() => {
      await actions(wrapper, () => {
        wrapper.update();
        const actual = wrapper.containsMatchingElement(
          props.component({
            ...mocks[0].result.data[props.entityName]
          })
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
            <SingleEntityContainer {...props} />
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
            <SingleEntityContainer {...props} />
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
