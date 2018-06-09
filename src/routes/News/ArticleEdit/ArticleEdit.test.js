import React from 'react'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import { ArticleEdit } from './index';
import NewsArticleForm from '../../../components/NewsArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleEdit', () => {
  let wrapper,
    props,
    baseProps = {
      onEditArticle: () => {},
      onFetchArticle: () => { },
      onDestroyArticle: () => {},
      resetPromiseState: () => {},
      article: { title: 'test', id: 'asdf1234' },
      location: {
        pathname: 'article/edit'
      },
      match: {
        params: { id: 123 }
      }
    };

  describe('methods', () => {

    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        let props = baseProps;
        props.resetPromiseState = sinon.spy();
        wrapper = shallow(<ArticleEdit {...props} />);
        wrapper.unmount();
        expect(props.resetPromiseState).to.have.been.called;
        expect(props.resetPromiseState).to.have.been.calledOnce;
      });
      it('should call onDestroyArticle', () => {
        let props = baseProps;
        props.onDestroyArticle = sinon.spy();
        wrapper = shallow(<ArticleEdit {...props} />);
        wrapper.unmount();
        expect(props.onDestroyArticle).to.have.been.called;
        expect(props.onDestroyArticle).to.have.been.calledOnce;
      });
    });

    describe('componentWillMount', () => {
      it('should call onFetchArticle if there is no article', () => {
        let props = baseProps;
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<ArticleEdit {...props} article={{}} />);
        wrapper.unmount();
        expect(props.onFetchArticle).to.have.been.called;
        expect(props.onFetchArticle).to.have.been.calledOnce;
      });
      it('should call onFetchArticle if there is no article', () => {
        let props = baseProps;
        props.onFetchArticle = sinon.spy();
        wrapper = shallow(<ArticleEdit {...props} article={{ title: 'test' }} />);
        wrapper.unmount();
        expect(props.onFetchArticle).to.have.been.called;
        expect(props.onFetchArticle).to.have.been.calledOnce;
      });
    });

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
        <LoadingSpinner
          active={props.promiseLoading}
          fullScreen
        />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when article is successfully posted, promise not loading and article.editSuccess', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = false;
      props.promiseSuccess = true;
      props.article.editSuccess = true;
      wrapper = shallow(<ArticleEdit {...props} />);
    });
    it('should show success message and link', () => {
      const actual = wrapper.containsAllMatchingElements([
        <h2>Successfully updated! <br /><br />🚀</h2>,
        <Link to='/news'>Go to news</Link>
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
