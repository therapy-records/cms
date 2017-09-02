import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import moment from 'moment';
import News from 'routes/News/Home/components/News';

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
        onFetchNewsQueueArticles: () => {},
        onSetSelectedNewsArticle: () => {},
        newsArticles: mockNewsArticles,
        articlesQueue: mockNewsArticles
      };

  it('should render a loading message if promiseLoading', () => {
    props = { ...baseProps, promiseLoading: true };
    wrapper = shallow(<News {...props} />);
    const actual = wrapper.containsMatchingElement(
      <p>Loading...</p>
    );
    expect(actual).to.equal(true);
  });

  it('should render create a new queue link', () => {
    props = baseProps;
    wrapper = shallow(<News {...props} />);
    const actual = wrapper.containsMatchingElement(
      <Link to='news/create'>Create a new article</Link>
    );
    expect(actual).to.equal(true);
  });

  it('should render list of newsArticles', () => {
    props = baseProps;
    wrapper = shallow(<News {...props} />);
    const renderNewsArticle = (key) => {
      const p = props.newsArticles[key]; // eslint-disable-line
      return (
        <li key={p._id} className='news-item'>
          <img />
          <div>
            {(!p.scheduledTime && p.createdAt) && <p className='created-at'>{moment(p.createdAt).fromNow()}</p>}
            <h3><Link to={`news/${p._id}`}>{p.title}</Link></h3>
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
      const lastArticle = wrapper.find('.news-item').last();
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
      const lastArticle = wrapper.find('.news-item').last();
      const lastArticleButton = lastArticle.find(Link).last();
      lastArticleButton.simulate('click');
      expect(_props.onSetSelectedNewsArticle).to.have.been.called;
      const expectedArticle = mockNewsArticles[mockNewsArticles.length - 1];
      expect(_props.onSetSelectedNewsArticle).to.have.been.calledWith(expectedArticle);
    });
  });

  it('should render an error if no new articles length', () => {
    const wrapper = shallow(
      <News
        newsArticles={[]}
        newsQueueArticles={[]}
        onFetchNewsArticles={() => {}}
        onFetchNewsQueueArticles={() => {}}
      />
    );
    const actual = wrapper.containsMatchingElement(
      <p>Unable to fetch articles :(</p>
    );
    expect(actual).to.equal(true);
  });
});
