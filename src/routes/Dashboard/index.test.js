import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Dashboard } from './index'

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Dashboard', () => {
  let props,
      wrapper,
      mockArticles = [
        { title: 'test' },
        { title: 'testing' }
      ]

  beforeEach(() => {
    props = {
      newsArticles: mockArticles,
      otherWorkArticles: mockArticles,
      onFetchNewsArticles: () => mockArticles,
      onFetchOtherWorkArticles: () => mockArticles,
      resetPromiseState: () => {}
    }
    wrapper = shallow(<Dashboard {...props} />)
  });

  it('should render a heading with `create...` copy', () => {
    const heading = wrapper.containsMatchingElement(
      <h2>Welcome back</h2>
    );
    expect(heading).to.be.true;
    const copy = wrapper.containsMatchingElement(
      <p>Create a new...</p>
    );
    expect(copy).to.be.true;
  });

  it('should render a link to create a news article', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='news/create'>News article</Link>
    );
    expect(actual).to.be.true;
  });

  it('should render a link to create a other-work article', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='other-work/create'>Other Work article</Link>
    );
    expect(actual).to.be.true;
  });
 
  it('should render a total amount of news articles', () => {
    const actual = wrapper.containsMatchingElement(
      <p>News articles: {props.newsArticles.length}</p>
    );
    expect(actual).to.be.true;
  });

  it('should render a total amount of other-work articles', () => {
    const actual = wrapper.containsMatchingElement(
      <p>Other-work articles: {props.otherWorkArticles.length}</p>
    );
    expect(actual).to.be.true;
  });

  describe('when newsArticles === null', () => {
    it('should call onFetchNewsArticles', () => {
      props.newsArticles = null;
      props.onFetchNewsArticles = sinon.spy();
      props.resetPromiseState = () => {};
      shallow(<Dashboard {...props} />)
      expect(props.onFetchNewsArticles).to.have.been.called;
    });
  });

  describe('when newsArticles is empty array', () => {
    it('should not call onFetchNewsArticles', () => {
      props.newsArticles = [];
      props.onFetchNewsArticles = sinon.spy();
      props.resetPromiseState = () => { };
      shallow(<Dashboard {...props} />)
      expect(props.onFetchNewsArticles).to.not.have.been.called;
    });
  });

  describe('when otherWorkArticles === null', () => {
    it('should call onFetchOtherWorkArticles', () => {
      props.otherWorkArticles = null;
      props.onFetchOtherWorkArticles = sinon.spy();
      props.resetPromiseState = () => { };
      shallow(<Dashboard {...props} />)
      expect(props.onFetchOtherWorkArticles).to.have.been.called;
    });
  });

  describe('when otherWorkArticles is empty array', () => {
    it('should not call onFetchOtherWorkArticles', () => {
      props.otherWorkArticles = [];
      props.onFetchOtherWorkArticles = sinon.spy();
      props.resetPromiseState = () => { };
      shallow(<Dashboard {...props} />)
      expect(props.onFetchOtherWorkArticles).to.not.have.been.called;
    });
  });
  

  // todo: test componentWillUnmount calls resetPromiseState
});
