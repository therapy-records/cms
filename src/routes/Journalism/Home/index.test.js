import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import moment from 'moment';
import configureMockStore from 'redux-mock-store';
import ConnectedJournalism, { Journalism } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';
import { selectSelectedNewsArticle } from '../../../selectors/news';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

const createJournalismArticles = (ids) => {
  const articles = [];
  ids.map(id => {
    articles.push({
      title: `test ${id}`,
      _id: `asd12${id}`,
      releaseDate: new Date(),
      externalLink: 'http://test.com',
      mainImageUrl: 'http://test.com'
    })
  });
  return articles;
}

const mockJournalismArticles = createJournalismArticles([1, 2, 3]);

describe('(Component) Journalism - Home', () => {
  let wrapper,
    props,
    baseProps = {
      onfetchJournalismArticles: sinon.spy(),
      onsetSelectedJournalismArticle: sinon.spy(),
      articles: mockJournalismArticles,
      resetPromiseState: sinon.spy(),
      onSetSelectedNewsArticle: sinon.spy()
    };
  props = baseProps;

  beforeEach(() => {
    wrapper = shallow(<Journalism {...props} />);
  });

  describe('methods', () => {
    describe('componentWillMount', () => {
      it('should call onfetchJournalismArticles when articles === null', () => {
        const onFetchJournalismArticlesSpy = sinon.spy();
        wrapper = shallow(
          <Journalism
            {...props}
            articles={null}
            onfetchJournalismArticles={onFetchJournalismArticlesSpy}
          />
        );
        wrapper.instance().componentWillUnmount();
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
            <img src={p.mainImageUrl} />
            <div>
              <div className='heading-with-btn'>
                <h3>
                  <Link
                    to={`journalism/${p._id}`}
                  >{p.title}
                  </Link>
                </h3>
                {p.releaseDate && <p className='small-tab'>{moment(p.releaseDate).format('DD MMM YYYY')}</p>}
              </div>

              <p>Links to: {p.externalLink}</p>

              <Link
                to={`journalism/${p._id}`}
                className='btn btn-sm'
              >
                View
              </Link>
              <Link
                to={`journalism/${p._id}/edit`}
                className='btn btn-sm'
              >
                Edit
              </Link>
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
      it('should call onsetSelectedJournalismArticle on `view` button click', () => {
        let _props = baseProps;
        _props.onsetSelectedJournalismArticle = sinon.spy();
        wrapper = shallow(<Journalism {..._props} />);
        const lastArticle = wrapper.find('.article-card').last();
        const lastArticleButton = lastArticle.find(Link).first();
        lastArticleButton.simulate('click');
        expect(_props.onsetSelectedJournalismArticle).to.have.been.called;
        const expectedArticle = mockJournalismArticles[mockJournalismArticles.length - 1];
        expect(_props.onsetSelectedJournalismArticle).to.have.been.calledWith(expectedArticle);
      });

      it('should call onsetSelectedJournalismArticle on `edit` button click', () => {
        let _props = baseProps;
        _props.onsetSelectedJournalismArticle = sinon.spy();
        wrapper = shallow(<Journalism {..._props} />);
        const lastArticle = wrapper.find('.article-card').last();
        const lastArticleButton = lastArticle.find(Link).last();
        lastArticleButton.simulate('click');
        expect(_props.onsetSelectedJournalismArticle).to.have.been.called;
        const expectedArticle = mockJournalismArticles[mockJournalismArticles.length - 1];
        expect(_props.onsetSelectedJournalismArticle).to.have.been.calledWith(expectedArticle);
      });
    });

    describe('when promiseLoading is false', () => {
      it('should render a page title', () => {
        const actual = wrapper.containsMatchingElement(
          <h2>Journalism</h2>
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
            onfetchJournalismArticles={() => { }}
            onsetSelectedJournalismArticle={() => { }}
          />
        );
        const actual = wrapper.containsMatchingElement(
          <EmptyArticlesMessage type='journalism' />
        );
        expect(actual).to.equal(true);
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
        ]
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
      renderedProps = wrapper.props();
      expect(renderedProps.article).to.eq(selectSelectedNewsArticle(mockStoreState));
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
    });
  });

});