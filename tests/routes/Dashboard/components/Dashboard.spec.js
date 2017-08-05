import React from 'react'
import { Link } from 'react-router';
import { Dashboard } from 'routes/Dashboard/components/Dashboard'
import { shallow } from 'enzyme'

describe('(Component) Dashboard', () => {
  let props,
      wrapper,
      mockNewsArticles = [
        { title: 'test' },
        { title: 'testing' }
      ];

  beforeEach(() => {
    props = {
      newsArticles: mockNewsArticles,
      onFetchNewsArticles: () => mockNewsArticles,
      resetPromiseState: () => {}
    }
    wrapper = shallow(<Dashboard {...props} />)
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Welcome back</h2>
    );
    expect(actual).to.be.true;
  });

  it('should render a link to create a news article', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='news/create'>Create a new article</Link>
    );
    expect(actual).to.be.true;
  });

  it('should render a total amount of news articles', () => {
    const actual = wrapper.containsMatchingElement(
      <p>News articles: {props.newsArticles.length}</p>
    );
    expect(actual).to.be.true;
  });

  describe('when there are no newsArticles in props', () => {
    it('should call onFetchNewsArticles', () => {
      props = {
        newsArticles: [],
        onFetchNewsArticles: sinon.spy()
      };
      shallow(<Dashboard {...props} />)
      expect(props.onFetchNewsArticles).to.have.been.called;
    });
  });

  // todo: test componentWillUnmount calls resetPromiseState
});
