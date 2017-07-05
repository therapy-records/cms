import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import ArticleEdit from 'routes/News/ArticleEdit/components/ArticleEdit'

describe('(Component) News - ArticleEdit', () => {
  let wrapper,
      props,
      baseProps = {
        onPostForm: () => {},
        article: { title: 'test' }
      };

  it('should render editing title', () => {
    props = baseProps;
    wrapper = shallow(<ArticleEdit {...props} />);
    const actual = wrapper.containsMatchingElement(
      <p>editing <br />{props.article.title}</p>
    );
    expect(actual).to.equal(true);
  });

  describe('when promise is loading', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = true;
      wrapper = shallow(<ArticleEdit {...props} />);
    });
    it('should show loading', () => {
      const actual = wrapper.containsMatchingElement(
        <p>loading...</p>
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
      props.promiseError = {
        message: 'api error'
      };
      wrapper = shallow(<ArticleEdit {...props} />);
    });
    it('should show error message', () => {
      const actual = wrapper.containsMatchingElement(
        <p>error updating news post :( {props.promiseError.message}</p>
      );
      expect(actual).to.equal(true);
    });
  });
});
