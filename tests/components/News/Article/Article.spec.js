import React from 'react'
import Article from 'routes/News/Article/components/Article'
import { shallow } from 'enzyme'

describe('(Component) News - Article', () => {
  let wrapper, 
      props,
      mockArticle = {
      _id: 'asdf1234',
      title: 'hello world',
      bodyMain: '<p>dummy copy</p>',
      mainImageUrl: 'http://test.com/hi.jpg',
      createdAt: new Date()
    },
    baseProps = {
      onFetchNews: () => {},
      onDeleteArticle: () => {}
    };

  describe('when promise is loading', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseLoading = true;
      wrapper = shallow(<Article {...props} />);
    });
    it('should show loading', () => {
      const actual = wrapper.containsMatchingElement(
        <h1>loading...</h1>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when promise errors', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseError = true;
      wrapper = shallow(<Article {...props} />);
    });
    it('should show loading', () => {
      const actual = wrapper.containsMatchingElement(
        <p>error fetching news post :(</p>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when an article exists', () => {
    beforeEach(() => {
      props = baseProps;
      props.article = mockArticle;
      props.promiseSuccess = true;
      wrapper = shallow(<Article {...props} />);
    });
    it('should render a title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>{props.article.title}</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render an image', () => {
      const actual = wrapper.containsMatchingElement(
        <img src={props.article.mainImageUrl} />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when an article does not exist', () => {
    beforeEach(() => {
      props = baseProps;
      props.promiseSuccess = true;
      wrapper = shallow(<Article {...props} />);
    });
  });

});
