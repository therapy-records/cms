import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Link } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Article } from './index'
import ArticleDeleteModal from '../../../components/ArticleDeleteModal'
import LoadingSpinner from '../../../components/LoadingSpinner';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

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
        mainImage: {
          url: 'http://test.com/hi.jpg'
        },
        quotes:[
          { copy: 'asdfasdf', author: 'rtrtrtrt' },
          { copy: 'qweqweqwe', author: 'asdf' },
          { copy: 'uiouio', author: 'nbvbnvbnvb' },
          { copy: '123', author: 'dfdfdf' }
        ],
        createdAt: new Date(),
        ticketsLink: 'http://test.com',
        venueLink: 'http://test.com',
        videoEmbed: 'http://youtube.com/something',
        miniGalleryImages: mockMiniGalleryImages,
        socialShare: {}
      },
      baseProps = {
        onFetchNewsArticles: sinon.spy(),
        onDeleteArticle: sinon.spy(),
        onDeleteScheduledArticle: sinon.spy(),
        resetPromiseState: sinon.spy(),
        onDestroyArticle: sinon.spy(),
        onFetchArticle: sinon.spy(),
        params: { id: 123 },
        history: {
          location: {
            pathname: 'news/123456789'
          }
        },
        match: {
          params: {
            id: 1234
          }
        },
        article: mockArticle
      };

  describe('on componentWillUnmount', () => {
    let props,
        wrapper;
    beforeEach(() => {
      props = {
        ...baseProps,
        resetPromiseState: sinon.spy(),
        onDestroyArticle: sinon.spy()
      }
      wrapper = shallow(<Article {...props} />);
    });
    it('should call resetPromiseState', () => {
      wrapper.unmount();
      expect(props.resetPromiseState.calledOnce).to.eq(true);
    });
    it('should call onDestroyArticle if location.pathname does not include edit', () => {
      wrapper.unmount();
      expect(props.onDestroyArticle.calledOnce).to.eq(true);
    });

    it('should not call onDestroyArticle if history.location.pathname includes edit', () => {
      props.history = {
        location: {
          pathname: 'news/123456789/edit'
        }
      };
      wrapper = shallow(<Article {...props} />);
      wrapper.unmount();
      expect(props.onDestroyArticle.calledOnce).to.eq(false);
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
        <LoadingSpinner />
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
      props.onFetchArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
    });
    it('should call onFetchArticle', () => {
      expect(props.onFetchArticle.calledOnce).to.eq(true);
    });
  });

  describe('when an article id does not match param ID', () => {
    it('should call onFetchArticle', () => {
      props = baseProps;
      props.article = { _id: 456 };
      props.params = { id: 123 };
      props.onFetchArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      expect(props.onFetchArticle.calledOnce).to.eq(true);
    });
  });

  describe('when there is no param ID', () => {
    it('should call onFetchArticle', () => {
      props = baseProps;
      props.article = { _id: 456 };
      props.params = { };
      props.onFetchArticle = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      expect(props.onFetchArticle.calledOnce).to.eq(true);
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

    it('should render a list of quotes', () => {
      const quotes = props.article.quotes;
      const actual = wrapper.containsAllMatchingElements([
        <li><i>&quot;{quotes[0].copy}&quot;</i> - {quotes[0].author}</li>,
        <li><i>&quot;{quotes[1].copy}&quot;</i> - {quotes[1].author}</li>,
        <li><i>&quot;{quotes[2].copy}&quot;</i> - {quotes[2].author}</li>,
        <li><i>&quot;{quotes[3].copy}&quot;</i> - {quotes[3].author}</li>
      ]);
      expect(actual).to.equal(true);
    });

    describe('main image', () => {
      it('should render mainImage.url if it exists', () => {
        const actual = wrapper.containsMatchingElement(
          <img
            src={props.article.mainImage.url}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actual).to.equal(true);
      });

      it('should render the first image in miniGalleryImages if !mainImage.url and miniGalleryImages length', () => {
        props = baseProps;
        props.article.mainImage.url = undefined;
        wrapper = shallow(<Article {...props} />);
        const actual = wrapper.containsMatchingElement(
          <img
            src={props.article.miniGalleryImages[0]}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actual).to.equal(true);
      });

      it('should not render an image if !miniGalleryImages or !mainImage.url', () => {
        props = baseProps;
        props.article.mainImage.url = undefined;
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
            src={props.article.mainImage.url}
            alt={`Fiona Ross - ${props.article.title}`}
          />
        );
        expect(actualMainImageUrl).to.equal(false);
      });

      it('should render inside a link if mainImage.externalLink', () => {
        props = baseProps;
        props.article = mockArticle;
        props.article.mainImage.externalLink = 'testing.com';
        wrapper = shallow(<Article {...props} />);
        const actualMiniGalleryImages = wrapper.containsMatchingElement(
          <a href={mockArticle.mainImage.externalLink}
             target='_blank'>
            <img
              src={props.article.miniGalleryImages[0]}
              alt={`Fiona Ross - ${props.article.title}`}
            />
          </a>
        );
        expect(actualMiniGalleryImages).to.equal(false);
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
          allowFullScreen
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
        <ArticleDeleteModal
          handleModalClose={wrapper.instance().handleModalClose}
          onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
        />
      );
      expect(actual).to.equal(false);
    });

    it('should set state and render <ArticleDeleteModal />', () => {
      const button = wrapper.find('button');
      button.simulate('click');
      const actual = wrapper.containsMatchingElement(
        <ArticleDeleteModal
          handleModalClose={wrapper.instance().handleModalClose}
          onDeleteArticle={wrapper.instance().handleOnDeleteArticle}
        />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<Article {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
