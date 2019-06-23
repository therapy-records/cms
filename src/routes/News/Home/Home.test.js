import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { News } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';

Enzyme.configure({ adapter: new Adapter() });

const mockArticles = [
  { title: 'test 1', _id: 'asd123', createdAt: new Date() },
  { title: 'test 2', _id: 'asd124', createdAt: new Date() },
  { title: 'test 3', _id: 'asd125', createdAt: new Date() }
];

describe('(Component) News - Home', () => {
  let wrapper,
    props,
    baseProps = {
      onFetchNewsArticles: () => {},
      onSetSelectedNewsArticle: () => {},
      articles: mockArticles
    };

  it('should render <LoadingSpinner />', () => {
    props = { ...baseProps, promiseLoading: true };
    wrapper = shallow(<News {...props} />);
    const actual = wrapper.containsMatchingElement(
      <LoadingSpinner
        active={props.promiseLoading}
        fullScreen
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render list of articles', () => {
    props = baseProps;
    wrapper = shallow(<News {...props} />);
    const renderNewsArticle = (key) => {
      const p = props.articles[key]; // eslint-disable-line
      return (
        <li key={p._id} className='article-card'>
          <img />
          <div>
            <div className='heading-with-btn'>
              <h3><Link to={`news/${p._id}`}>{p.title}</Link></h3>
              {p.createdAt && <p className='small-tab'>{moment(p.createdAt).fromNow()}</p>}
            </div>
            <Link to={`news/${p._id}`} className='btn btn-sm'>View</Link>
            <Link to={`news/${p._id}/edit`} className='btn btn-sm'>Edit</Link>
          </div>
        </li>
      )
    };

    const child0 = wrapper.containsMatchingElement(renderNewsArticle(0));
    expect(child0).to.equal(true);
    const child1 = wrapper.containsMatchingElement(renderNewsArticle(1));
    expect(child1).to.equal(true);
    const child2 = wrapper.containsMatchingElement(renderNewsArticle(2));
    expect(child2).to.equal(true);
  });

  describe('article', () => {
    it('should call onSetSelectedNewsArticle on `view` button click', () => {
      let _props = baseProps;
      _props.onSetSelectedNewsArticle = sinon.spy();
      wrapper = shallow(<News {..._props} />);
      const lastArticle = wrapper.find('.article-card').last();
      const lastArticleButton = lastArticle.find(Link).first();
      lastArticleButton.simulate('click');
      expect(_props.onSetSelectedNewsArticle).to.have.been.called;
      const expectedArticle = mockArticles[mockArticles.length - 1];
      expect(_props.onSetSelectedNewsArticle).to.have.been.calledWith(expectedArticle);
    });

    it('should call onSetSelectedNewsArticle on `edit` button click', () => {
      let _props = baseProps;
      _props.onSetSelectedNewsArticle = sinon.spy();
      wrapper = shallow(<News {..._props} />);
      const lastArticle = wrapper.find('.article-card').last();
      const lastArticleButton = lastArticle.find(Link).last();
      lastArticleButton.simulate('click');
      expect(_props.onSetSelectedNewsArticle).to.have.been.called;
      const expectedArticle = mockArticles[mockArticles.length - 1];
      expect(_props.onSetSelectedNewsArticle).to.have.been.calledWith(expectedArticle);
    });
  });

  describe('when promiseLoading is false', () => {
    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>News</h2>
      );
      expect(actual).to.equal(true);
    });
    it('should render a create button', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='news/create' className='btn'>Create</Link>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when no articles', () => {
    it('should render a message with button link', () => {
      const wrapper = shallow(
        <News
          newsArticles={[]}
          onFetchNewsArticles={() => { }}
          onSetSelectedNewsArticle={() => { }}
        />
      );
      const actual = wrapper.containsMatchingElement(
        <EmptyArticlesMessage type='news' />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('methods', () => {

    describe('componentWillMount', () => {
      it('should call onfetchJournalismArticles when articles === null', () => {
        props.onFetchNewsArticles = sinon.spy();
        props.articles = null;
        wrapper = shallow(<News {...props} />);
        expect(props.onFetchNewsArticles.calledOnce).to.eq(true);
      });
    });

    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        props.resetPromiseState = sinon.spy();
        wrapper = shallow(<News {...props} />);
        wrapper.instance().componentWillUnmount();
        expect(props.resetPromiseState).to.have.been.called;
      });
    });

    describe('getArticleImageUrl', () => {
      it('should return an article\'s first image in article.sections', () => {
        const mockArticle = {
          sections: [
            {
              images: [
                { url: 'http://testing.com' }
              ]
            }
          ]
        };
        wrapper = shallow(<News {...props} />);
        const result = wrapper.instance().getArticleImageUrl(mockArticle);
        const expected = mockArticle.sections[0].images[0].url;
        expect(result).to.eq(expected);
      });
      describe('when the article does not have an image', () => {
        it('should return a placeholder image', () => {
          wrapper = shallow(<News {...props} />);
          const result = wrapper.instance().getArticleImageUrl({});
          const expected = 'http://via.placeholder.com/100x137/C8C8C8/777?text=No+image&color=EEEEEE';
          expect(result).to.eq(expected);
        });
      });
    });
  });
});
