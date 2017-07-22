import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import ArticleCreate from 'routes/News/ArticleCreate/components/ArticleCreate'
import NewsPostForm from 'components/NewsPostForm'

describe('(Component) News - ArticleCreate', () => {
  let wrapper,
      props,
      baseProps = {
        onPostNews: () => {},
        onPostQueueNews: () => {}
      };

  it('should render a NewsPostForm', () => {
    props = baseProps;
    wrapper = shallow(<ArticleCreate {...props} />);
    const actual = wrapper.containsMatchingElement(
      <NewsPostForm
        onSubmitForm={props.onPostNews}
        onSubmitFormQueue={props.onPostQueueNews}
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
      wrapper = shallow(<ArticleCreate {...props} />);
    });
    it('should show success message and link', () => {
      const actual = wrapper.containsAllMatchingElements([
        <h2>Successfully posted! <br /><br />🚀</h2>,
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
      wrapper = shallow(<ArticleCreate {...props} />);
    });
    it('should show error message', () => {
      const actual = wrapper.containsMatchingElement(
        <p>error posting :( {props.promiseError.message}</p>
      );
      expect(actual).to.equal(true);
    });
  });
});
