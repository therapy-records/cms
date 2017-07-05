import React from 'react'
import { Link } from 'react-router';
import { Dashboard } from 'routes/Dashboard/components/Dashboard'
import { shallow } from 'enzyme'

describe('(Component) Counter', () => {
  let props, wrapper

  beforeEach(() => {
    props = {
      newsPosts: [ { title: 'test' }, { title: 'testing' } ]
    }
    wrapper = shallow(<Dashboard {...props} />)
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Welcome back</h2>
    );
    expect(actual).to.be.true;
  });

  it('should render a link to create a news post', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='news/create'>Create a new post</Link>
    );
    expect(actual).to.be.true;
  });

  it('should render a total amount of news posts', () => {
    const actual = wrapper.containsMatchingElement(
      <p>News posts: {props.newsPosts.length}</p>
    );
    expect(actual).to.be.true;
  });

  describe('when there are no newsPosts in props', () => {
    it('should call onFetchNews', () => {
      props = {
        onFetchNews: sinon.spy()
      };
      props.onFetchNews.should.have.been.called;
    });
  });
  // todo: test componentWillUnmount calls resetPromiseState
})
