import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import ConnectedJournalism, { Journalism } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';
import {
  selectJournalismHasFetched,
  selectSelectedJournalismArticle
} from '../../../selectors/journalism';
import {selectUiStateLoading} from '../../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

const createJournalismArticles = (ids) => {
  const articles = [];
  ids.map(id => {
    articles.push({
      title: `test ${id}`,
      _id: `asd12${id}`,
      releaseDate: new Date(),
      externalLink: 'http://test.com',
      imageUrl: 'http://test.com'
    })
  });
  return articles;
}

const mockJournalismArticles = createJournalismArticles([1, 2, 3]);

describe('(Component) Journalism - Home', () => {
  let wrapper,
    props,
    baseProps = {
      hasFetchedArticles: true,
      onFetchJournalismArticles: () => {},
      onSetSelectedJournalismArticle: sinon.spy(),
      articles: mockJournalismArticles,
      resetPromiseState: sinon.spy()
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<Journalism {...props} />);
  });

  describe('rendering', () => {
    it('should render <LoadingSpinner />', () => {
      wrapper.setProps({
        promiseLoading: true
      });
      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner
          active={props.promiseLoading}
          fullScreen
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render list of journalismArticles', () => {
      const expectedArticle = (key) => {
        const p = props.articles[key]; // eslint-disable-line
        return (
          <li key={p._id} className='article-card'>
            <div className='img-container'>
              <img src={p.imageUrl} />
            </div>
            <div>
              <div className='heading-with-btn'>
                <h3>
                  <Link
                    to={`/journalism/${p._id}`}
                  >
                    <span>{p.title}</span>
                    {p.releaseDate && <p className='small-tab'>{moment(p.releaseDate).format('DD MMM YYYY')}</p>}
                  </Link>
                </h3>
              </div>

              <div className='btns-always-inline'>
                <Link
                  to={`/journalism/${p._id}`}
                  className='btn btn-sm btn-view'
                >
                  View
                </Link>
                <Link
                  to={`/journalism/${p._id}/edit`}
                  className='btn btn-sm btn-edit'
                >
                  Edit
                </Link>
              </div>
            </div>
          </li>
        )
      };
      const child0 = wrapper.containsMatchingElement(expectedArticle(0));
      expect(child0).to.equal(true);
      const child1 = wrapper.containsMatchingElement(expectedArticle(1));
      expect(child1).to.equal(true);
      const child2 = wrapper.containsMatchingElement(expectedArticle(2));
      expect(child2).to.equal(true);
    });

    describe('article', () => {
      describe('heading button', () => {
        it('should call handleButtonClick', () => {
          let _props = baseProps;
          const handleButtonClickSpy = sinon.spy();
          wrapper = shallow(<Journalism {..._props} />);
          wrapper.instance().handleButtonClick = handleButtonClickSpy;
          const lastArticle = wrapper.find('.article-card').last();
          const button = lastArticle.find(Link).first();
          button.simulate('click');
          expect(handleButtonClickSpy).to.have.been.called;
          const expectedCalledWith = mockJournalismArticles[mockJournalismArticles.length - 1];
          expect(handleButtonClickSpy).to.have.been.calledWith(expectedCalledWith);
        });
      });

      describe('view button', () => {
        it('should call handleButtonClick', () => {
          let _props = baseProps;
          const handleButtonClickSpy = sinon.spy();
          wrapper = shallow(<Journalism {..._props} />);
          wrapper.instance().handleButtonClick = handleButtonClickSpy;
          const lastArticle = wrapper.find('.article-card').last();
          const viewButton = lastArticle.find('.btn-view');
          viewButton.simulate('click');
          expect(handleButtonClickSpy).to.have.been.called;
          const expectedCalledWith = mockJournalismArticles[mockJournalismArticles.length - 1];
          expect(handleButtonClickSpy).to.have.been.calledWith(expectedCalledWith);
        });
      });

      describe('edit button', () => {
        it('should call handleButtonClick', () => {
          let _props = baseProps;
          const handleButtonClickSpy = sinon.spy();
          wrapper = shallow(<Journalism {..._props} />);
          wrapper.instance().handleButtonClick = handleButtonClickSpy;
          const lastArticle = wrapper.find('.article-card').last();
          const editButton = lastArticle.find('.btn-edit');
          editButton.simulate('click');
          expect(handleButtonClickSpy).to.have.been.called;
          const expectedCalledWith = mockJournalismArticles[mockJournalismArticles.length - 1];
          expect(handleButtonClickSpy).to.have.been.calledWith(expectedCalledWith);
        });
      });
    });

    describe('when promiseLoading is false', () => {
      it('should render a page title', () => {
        const actual = wrapper.containsMatchingElement(
          <h2>Journalism ✍️</h2>
        );
        expect(actual).to.equal(true);
      });
      it('should render a create button', () => {
        const actual = wrapper.containsMatchingElement(
          <Link to='journalism/create' className='btn'>Create</Link>
        );
        expect(actual).to.equal(true);
      });
    });

    describe('when no articles', () => {
      it('should render a message with button link', () => {
        const wrapper = shallow(
          <Journalism
            articles={[]}
            hasFetchedArticles={false}
            onFetchJournalismArticles={() => { }}
            onSetSelectedJournalismArticle={() => { }}
            resetPromiseState={() => {}}
          />
        );
        const actual = wrapper.containsMatchingElement(
          <EmptyArticlesMessage type='journalism' />
        );
        expect(actual).to.equal(true);
      });
    });
  });

  describe('methods', () => {
    describe('componentWillMount', () => {
      it('should call onFetchNewsArticles when props.hasFetchedArticles is FALSE', () => {
        const onFetchJournalismArticlesSpy = sinon.spy();
        wrapper.setProps({
            hasFetchedArticles: false,
            onFetchJournalismArticles: onFetchJournalismArticlesSpy
        });

        wrapper.instance().componentWillMount();
        expect(onFetchJournalismArticlesSpy.calledOnce).to.eq(true);
      });
    });

    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        const resetPromiseStateSpy = sinon.spy();
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy
        });
        wrapper.instance().componentWillUnmount();
        expect(resetPromiseStateSpy).to.have.been.called;
      });
    });

    describe('handleButtonClick', () => {
      it('should call props.onSetSelectedJournalismArticle', () => {
        const onSetSelectedJournalismArticleSpy = sinon.spy();
        wrapper.setProps({
          onSetSelectedJournalismArticle: onSetSelectedJournalismArticleSpy
        });
        wrapper.instance().handleButtonClick({test: true});
        expect(onSetSelectedJournalismArticleSpy).to.have.been.calledWith({ test: true })
      });
    });
  });
  
  describe('ConnectedJournalism', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false
      },
      location: {},
      journalism: {
        articles: [
          {test: true},
          {test: true}
        ],
        hasFetched: false
      },
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedJournalism
          store={store}
          location={mockStoreState.location}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.hasFetchedArticles).to.eq(selectJournalismHasFetched(mockStoreState));
      expect(renderedProps.article).to.eq(selectSelectedJournalismArticle(mockStoreState));
    });
  });

});
