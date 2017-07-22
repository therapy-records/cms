import React from 'react'
import { Link } from 'react-router'
import Article from 'routes/News/Article/components/Article'
import ArticleDeleteModal from 'routes/News/Article/components/ArticleDeleteModal'
import { shallow } from 'enzyme'

describe('(Component) News - Article', () => {
  let wrapper,
      props,
      mockArticle = {
        _id: 'asdf1234',
        title: 'hello world',
        bodyMain: '<p>dummy copy</p><div>something<h2>title</h2></div>',
        mainImageUrl: 'http://test.com/hi.jpg',
        createdAt: new Date()
      },
      baseProps = {
        onFetchNewsPosts: () => {},
        onDeleteArticle: () => {},
        destroySelectedNewsPost: () => {},
        resetPromiseState: () => {}
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

  it('should call destroySelectedNewsPost click on componentWillUnmount', () => {
    let props = baseProps;
    props.destroySelectedNewsPost = sinon.spy();
    wrapper = shallow(<Article {...props} />);
    wrapper.unmount();
    expect(props.destroySelectedNewsPost).to.have.been.called;
    expect(props.destroySelectedNewsPost).to.have.been.called.once;
  });
  
  describe('edit post button', () => {
    it('should be rendered', () => {
      let props = baseProps;
      props.destroySelectedNewsPost = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      const editButton = wrapper.find(Link);
      expect(editButton.length).to.equal(1);
    });
    it('should not call destroySelectedNewsPost on click', () => {
      let props = baseProps;
      props.destroySelectedNewsPost = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      const editButton = wrapper.find('.btn-edit');
      editButton.simulate('click');
      wrapper.unmount();
      expect(props.destroySelectedNewsPost).to.not.have.been.called;
    });
  });

  describe('delete post button', () => {
    beforeEach(() => {
      props = baseProps;
      props.handleModalOpen = sinon.spy();
      props.handleModalClose = () => {};
      wrapper = shallow(<Article {...props} />);
    });

    it('should not render <ArticleDeleteModal /> by default', () => {
      const actual = wrapper.containsMatchingElement(
        <ArticleDeleteModal />
      );
      expect(actual).to.equal(false);
    });

    it('should set state and render <ArticleDeleteModal />', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      const actual = wrapper.containsMatchingElement(
        <ArticleDeleteModal />
      );
      expect(actual).to.equal(true);
    });
  });
});
