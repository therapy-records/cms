import React from 'react'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom'
import { ArticleCreate } from './index'
import NewsArticleForm from '../../../components/NewsArticleForm'
import LoadingSpinner from '../../../components/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleCreate', () => {
  let wrapper,
    props,
    baseProps = {
      onPostArticle: () => {},
      // onPostArticleQueue: () => {},
      resetPromiseState: () => {}
    };

  it('should call resetPromiseState on componentWillUnmount', () => {
    let props = baseProps;
    props.resetPromiseState = sinon.spy();
    wrapper = shallow(<ArticleCreate {...props} />);
    wrapper.unmount();
    expect(props.resetPromiseState).to.have.been.called;
    expect(props.resetPromiseState).to.have.been.calledOnce;
  });

  it('should render a NewsArticleForm', () => {
    props = baseProps;
    wrapper = shallow(<ArticleCreate {...props} />);
    const actual = wrapper.containsMatchingElement(
      <NewsArticleForm
        onSubmitForm={props.onPostArticle}
      />
    );
    expect(actual).to.equal(true);
  });

  describe('when promise is loading', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = true;
      wrapper = shallow(<ArticleCreate {...props} />);
    });
    it('should show loading', () => {
      const actual = wrapper.containsMatchingElement(
        <LoadingSpinner />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when article is successfully posted and promise not loading', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = false;
      props.promiseSuccess = true;
      wrapper = shallow(<ArticleCreate {...props} />);
    });
    it('should show success message and link', () => {
      const actual = wrapper.containsAllMatchingElements([
        <h2>Successfully posted! <br /><br />🚀</h2>,
        <Link to='/news'>Go to news</Link>
      ]);
      expect(actual).to.equal(true);
    });
  });

  describe('when promise errors', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseError = {
        message: 'api error'
      };
      wrapper = shallow(<ArticleCreate {...props} />);
    });
    it('should show error message', () => {
      const actual = wrapper.containsMatchingElement(
        <p>error posting article :( {props.promiseError.message}</p>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<ArticleCreate {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
