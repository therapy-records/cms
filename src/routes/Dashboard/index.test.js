import React from 'react'

import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Dashboard } from './index'
import LoadingSpinner from '../../components/LoadingSpinner';

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
      journalismArticles: mockArticles,
      onFetchNewsArticles: () => mockArticles,
      onfetchJournalismArticles: () => mockArticles,
      resetPromiseState: () => {}
    }
    wrapper = shallow(<Dashboard {...props} />)
  });

  it('should render <LoadingSpinner />', () => {
    wrapper.setProps({
      promiseLoading: true
    });
    wrapper = shallow(<Dashboard {...props} />)
    const actual = wrapper.containsMatchingElement(
      <LoadingSpinner
        active={props.promiseLoading}
        fullScreen
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render a heading', () => {
    const heading = wrapper.containsMatchingElement(
      <h2>Create</h2>
    );
    expect(heading).to.be.true;
  });

  it('should render a link to create a news article', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='news/create'>News article</Link>
    );
    expect(actual).to.be.true;
  });

  it('should render a link to create a journalism article', () => {
    const actual = wrapper.containsMatchingElement(
      <Link to='journalism/create'>Journalism article</Link>
    );
    expect(actual).to.be.true;
  });

  it('should render a total amount of news articles', () => {
    const actual = wrapper.containsMatchingElement(
      <p>News articles: {props.newsArticles.length}</p>
    );
    expect(actual).to.be.true;
  });

  it('should render a total amount of journalism articles', () => {
    const actual = wrapper.containsMatchingElement(
      <p>Journalism articles: {props.journalismArticles.length}</p>
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

  describe('when journalismArticles === null', () => {
    it('should call onfetchJournalismArticles', () => {
      props.journalismArticles = null;
      props.onfetchJournalismArticles = sinon.spy();
      props.resetPromiseState = () => { };
      shallow(<Dashboard {...props} />)
      expect(props.onfetchJournalismArticles).to.have.been.called;
    });
  });

  describe('when journalismArticles is empty array', () => {
    it('should not call onfetchJournalismArticles', () => {
      props.journalismArticles = [];
      props.onfetchJournalismArticles = sinon.spy();
      props.resetPromiseState = () => { };
      shallow(<Dashboard {...props} />)
      expect(props.onfetchJournalismArticles).to.not.have.been.called;
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<Dashboard {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
