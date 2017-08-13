import React from 'react'
import { Link } from 'react-router'
import Article from 'routes/News/Article/components/Article'
import ArticleDeleteModal from 'routes/News/Article/components/ArticleDeleteModal'
import { shallow } from 'enzyme'

describe('(Component) News - Article', () => {
  let wrapper,
      props,
      mockMiniGalleryImages = [
        'http://image1.com',
        'http://image2.com',
        'http://image3.com'
      ],
      mockArticle = {
        _id: 'asdf1234',
        title: 'hello world',
        bodyMain: '<p>dummy copy</p><div>something<h2>title</h2></div>',
        mainImageUrl: 'http://test.com/hi.jpg',
        createdAt: new Date(),
        ticketsLink: 'http://test.com',
        venueLink: 'http://test.com',
        videoEmbed: 'http://youtube.com/something',
        miniGalleryImages: mockMiniGalleryImages,
        socialShare: {}
      },
      baseProps = {
        onFetchNewsArticles: () => {},
        onDeleteArticle: () => {},
        onDeleteScheduledArticle: () => {},
        resetPromiseState: () => {},
        onDestroyArticle: () => {},
        onFetchSingleNewsArticle: () => {},
        params: { id: 123 }
      };

  describe('on componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      let props = baseProps;
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      wrapper.unmount();
      expect(props.resetPromiseState).to.have.been.called;
      expect(props.resetPromiseState).to.have.been.called.once;
    });
    it('should call onDestroyArticle', () => {
      let props = baseProps;
      props.onDestroyArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      wrapper.unmount();
      expect(props.onDestroyArticle).to.have.been.called;
      expect(props.onDestroyArticle).to.have.been.called.once;
    });
  });

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

  describe('when article is deleted', () => {
    beforeEach(() => {
      props = baseProps;
      const deletedArticle = { isDeleted: true };
      props.article = deletedArticle;
      wrapper = shallow(<Article {...props} />);
    });

    it('should have correct copy', () => {
      const actual = wrapper.containsMatchingElement(
        <div>
          <h4>Successfully deleted!</h4>
          <p>redirecting...</p>
        </div>
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
        <p>error fetching news article :(</p>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when an article does not exist / article._id is undefined', () => {
    beforeEach(() => {
      props = baseProps;
      props.article = {};
      props.onFetchSingleNewsArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
    });
    it('should call onFetchSingleNewsArticle', () => {
      expect(props.onFetchSingleNewsArticle).to.have.been.called;
      expect(props.onFetchSingleNewsArticle).to.have.been.called.once;
    });
  });

  describe('when an article id does not match param ID', () => {
    it('should call onFetchSingleNewsArticle', () => {
      props = baseProps;
      props.article = { _id: 456 };
      props.params = { id: 123 };
      props.onFetchSingleNewsArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      expect(props.onFetchSingleNewsArticle).to.have.been.called;
      expect(props.onFetchSingleNewsArticle).to.have.been.called.once;
    });
  });

  describe('when there is no param ID', () => {
    it('should call onFetchSingleNewsArticle', () => {
      props = baseProps;
      props.article = { _id: 456 };
      props.params = { };
      props.onFetchSingleNewsArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      expect(props.onFetchSingleNewsArticle).to.have.been.called;
      expect(props.onFetchSingleNewsArticle).to.have.been.called.once;
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

    describe('main image', () => {
      it('should render mainImageUrl if it exists', () => {
        const actual = wrapper.containsMatchingElement(
          <img
            src={props.article.mainImageUrl}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actual).to.equal(true);
      });

      it('should render the first image in miniGalleryImages if !mainImageUrl and miniGalleryImages length', () => {
        props = baseProps;
        props.article.mainImageUrl = undefined;
        wrapper = shallow(<Article {...props} />);
        const actual = wrapper.containsMatchingElement(
          <img
            src={props.article.miniGalleryImages[0]}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actual).to.equal(true);
      });

      it('should not render an image if !miniGalleryImages or !mainImageUrl', () => {
        props = baseProps;
        props.article.mainImageUrl = undefined;
        props.article.miniGalleryImages = [];
        wrapper = shallow(<Article {...props} />);
        const actualMiniGalleryImages = wrapper.containsMatchingElement(
          <img
            src={props.article.miniGalleryImages[0]}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actualMiniGalleryImages).to.equal(false);

        const actualMainImageUrl = wrapper.containsMatchingElement(
          <img
            src={props.article.mainImageUrl}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actualMainImageUrl).to.equal(false);
      });
    });

    it('should render ticketsLink', () => {
      const actual = wrapper.containsMatchingElement(
        <a href={props.article.ticketsLink} target='_blank'>Get tickets</a>
      );
      expect(actual).to.equal(true);
    });

    it('should render venueLink', () => {
      const actual = wrapper.containsMatchingElement(
        <a href={props.article.venueLink} target='_blank'>Venue</a>
      );
      expect(actual).to.equal(true);
    });

    describe('miniGalleryImages', () => {
      beforeEach(() => {
        props.article.miniGalleryImages = mockMiniGalleryImages;
        wrapper = shallow(<Article {...props} />);
      });
      it('should render a heading', () => {
        const actual = wrapper.containsMatchingElement(
          <h3>Mini gallery images</h3>
        );
        expect(actual).to.equal(true);
      });

      it('should render a list of images', () => {
        const actual = wrapper.containsAllMatchingElements([
          <li><img src={props.article.miniGalleryImages[0]} /></li>,
          <li><img src={props.article.miniGalleryImages[1]} /></li>,
          <li><img src={props.article.miniGalleryImages[2]} /></li>
        ])
        expect(actual).to.equal(true);
      });
    });

    it('should render miniGalleryImages', () => {
      const actual = wrapper.containsMatchingElement(
        <a href={props.article.venueLink} target='_blank'>Venue</a>
      );
      expect(actual).to.equal(true);
    });

    it('should render videoEmbed', () => {
      const actual = wrapper.containsMatchingElement(
        <iframe
          width='560'
          src={props.article.videoEmbed}
          frameBorder='0'
          allowFullscreen
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render miniGalleryImages', () => {
      const actual = wrapper.containsAllMatchingElements([
        <li>
          <img src={props.article.miniGalleryImages[0]} />
        </li>,
        <li>
          <img src={props.article.miniGalleryImages[1]} />
        </li>,
        <li>
          <img src={props.article.miniGalleryImages[2]} />
        </li>
      ]);
      expect(actual).to.equal(true);
    });
  });

  describe('edit article button', () => {
    it('should be rendered', () => {
      let props = baseProps;
      wrapper = shallow(<Article {...props} />);
      const editButton = wrapper.find(Link);
      expect(editButton.length).to.equal(1);
    });
  });

  describe('delete article button', () => {
    beforeEach(() => {
      props = baseProps;
      props.article = mockArticle;
      props.handleModalOpen = sinon.spy();
      props.handleModalClose = () => {};
      props.promiseLoading = false;
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
