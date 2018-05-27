import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import { ArticleEdit } from './index';
import NewsArticleForm from '../../../components/NewsArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleEdit', () => {
  let wrapper,
      props,
      baseProps = {
        onEditArticle: () => {},
        onEditArticleQueue: () => {},
        resetPromiseState: () => {},
        article: { title: 'test' },
        location: {
          pathname: 'article/edit'
        }
      };

  it('should call onDestroyArticle on componentWillUnmount', () => {
    let props = baseProps;
    props.onDestroyArticle = sinon.spy();
    wrapper = shallow(<ArticleEdit {...props} />);
    wrapper.unmount();
    expect(props.onDestroyArticle).to.have.been.called;
    expect(props.onDestroyArticle).to.have.been.calledOnce;
  });

  it('should render editing title', () => {
    props = baseProps;
    wrapper = shallow(<ArticleEdit {...props} />);
    const actual = wrapper.containsMatchingElement(
      <p>editing <br />{props.article.title}</p>
    );
    expect(actual).to.equal(true);
  });

  it('should render a NewsArticleForm', () => {
    props = baseProps;
    wrapper = shallow(<ArticleEdit {...props} />);
    const form = wrapper.find(NewsArticleForm);
    expect(form.length).to.equal(1);
  });

  describe('when promise is loading', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = true;
      wrapper = shallow(<ArticleEdit {...props} />);
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
      wrapper = shallow(<ArticleEdit {...props} />);
    });
    it('should show success message and link', () => {
      const actual = wrapper.containsAllMatchingElements([
        <h2>Successfully updated! <br /><br />🚀</h2>,
        <Link to='news' className='news-link'>Go to news</Link>
      ]);
      expect(actual).to.equal(true);
    });
  });

  describe('when promise errors', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseError = true;
      wrapper = shallow(<ArticleEdit {...props} />);
    });
    it('should show error message', () => {
      const actual = wrapper.containsMatchingElement(
        <p>error updating news article :( {props.promiseError.message}</p>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<ArticleEdit {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
