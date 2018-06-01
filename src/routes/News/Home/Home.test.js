import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { News } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

const mockNewsArticles = [
  { title: 'test 1', _id: 'asd123' },
  { title: 'test 2', _id: 'asd124' },
  { title: 'test 3', _id: 'asd125' }
];

describe('(Component) News - Home', () => {
  let wrapper,
      props,
      baseProps = {
        onFetchNewsArticles: () => {},
        // onFetchNewsQueueArticles: () => {},
        onSetSelectedNewsArticle: () => {},
        newsArticles: mockNewsArticles,
        // articlesQueue: mockNewsArticles
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

  it('should render list of newsArticles', () => {
    props = baseProps;
    wrapper = shallow(<News {...props} />);
    const renderNewsArticle = (key) => {
      const p = props.newsArticles[key]; // eslint-disable-line
      return (
        <li key={p._id} className='article-card'>
          <img />
          <div>
            <div className='heading-with-btn'>
              {p.createdAt && <p className='small-tab'>{moment(p.createdAt).fromNow()}</p>}
              <h3><Link to={`news/${p._id}`}>{p.title}</Link></h3>
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
      const expectedArticle = mockNewsArticles[mockNewsArticles.length - 1];
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
      const expectedArticle = mockNewsArticles[mockNewsArticles.length - 1];
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
          // newsQueueArticles={[]}
          onFetchNewsArticles={() => { }}
          // onFetchNewsQueueArticles={() => {}}
          onSetSelectedNewsArticle={() => { }}
        />
      );
      const actual = wrapper.containsMatchingElement(
        <p>No articles yet. <Link to='news/create'>Create an article</Link></p>
      );
      expect(actual).to.equal(true);
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
});
