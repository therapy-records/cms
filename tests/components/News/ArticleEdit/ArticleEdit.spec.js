import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import ArticleEdit from 'routes/News/ArticleEdit/components/ArticleEdit'
import NewsPostForm from 'components/NewsPostForm'

describe('(Component) News - ArticleEdit', () => {
  let wrapper,
      props,
      baseProps = {
        onEditNews: () => {},
        onEditQueueNews: () => {},
        article: { title: 'test' },
        location: {
          pathname: 'article/edit'
        }
      };

  it('should render editing title', () => {
    props = baseProps;
    wrapper = shallow(<ArticleEdit {...props} />);
    const actual = wrapper.containsMatchingElement(
      <p>editing <br />{props.article.title}</p>
    );
    expect(actual).to.equal(true);
  });

  it('should render a NewsPostForm', () => {
    props = baseProps;
    wrapper = shallow(<ArticleEdit {...props} />);
    const form = wrapper.find(NewsPostForm);
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
      props.promiseError = true;
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
