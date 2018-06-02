import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { OtherWork } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';

Enzyme.configure({ adapter: new Adapter() });

const createOtherWorkArticles = (ids) => {
  const articles = [];
  ids.map(id => {
    articles.push({
      title: `test ${id}`,
      _id: `asd12${id}`,
      releaseDate: new Date(),
      externalLink: 'http://test.com',
      mainImageUrl: 'http://test.com'
    })
  });
  return articles;
}

const mockOtherWorkArticles = createOtherWorkArticles([1, 2, 3]);
describe('(Component) OtherWork - Home', () => {
  let wrapper,
    props,
    baseProps = {
      onFetchOtherWorkArticles: sinon.spy(),
      onSetSelectedOtherWorkArticle: sinon.spy(),
      articles: mockOtherWorkArticles,
      resetPromiseState: sinon.spy(),
      onSetSelectedNewsArticle: sinon.spy()
    };
  props = baseProps;

  it('should render <LoadingSpinner />', () => {
    wrapper = shallow(<OtherWork {...props} />);
    wrapper.setProps({
      promiseLoading: true
    });
    const actual = wrapper.containsMatchingElement(
      <LoadingSpinner
        active={props.promiseLoading}
        fullScreen
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render list of otherWorkArticles', () => {
    wrapper = shallow(<OtherWork {...props} />);
    const expectedArticle = (key) => {
      const p = props.articles[key]; // eslint-disable-line
      return (
        <li key={p._id} className='article-card'>
          <img src={p.mainImageUrl} />
          <div>
            <div className='heading-with-btn'>
              <h3>
                <Link
                  to={`other-work/${p._id}`}
                >{p.title}
                </Link>
              </h3>
              {p.releaseDate && <p className='small-tab'>{moment(p.releaseDate).format('DD MMM YYYY')}</p>}
            </div>

            <p>Links to: {p.externalLink}</p>

            <Link
              to={`other-work/${p._id}`}
              className='btn btn-sm'
            >
              View
            </Link>
            <Link
              to={`other-work/${p._id}/edit`}
              className='btn btn-sm'
            >
              Edit
            </Link>
          </div>
        </li>
      )
    };
    const child0 = wrapper.containsMatchingElement(expectedArticle(0));
    expect(child0).to.equal(true);
    const child1 = wrapper.containsMatchingElement(expectedArticle(1));
    expect(child1).to.equal(true);
    const child2 = wrapper.containsMatchingElement(expectedArticle(2));
    expect(child2).to.equal(true);
  });

  describe('article', () => {
    it('should call onSetSelectedOtherWorkArticle on `view` button click', () => {
      let _props = baseProps;
      _props.onSetSelectedOtherWorkArticle = sinon.spy();
      wrapper = shallow(<OtherWork {..._props} />);
      const lastArticle = wrapper.find('.article-card').last();
      const lastArticleButton = lastArticle.find(Link).first();
      lastArticleButton.simulate('click');
      expect(_props.onSetSelectedOtherWorkArticle).to.have.been.called;
      const expectedArticle = mockOtherWorkArticles[mockOtherWorkArticles.length - 1];
      expect(_props.onSetSelectedOtherWorkArticle).to.have.been.calledWith(expectedArticle);
    });

    it('should call onSetSelectedOtherWorkArticle on `edit` button click', () => {
      let _props = baseProps;
      _props.onSetSelectedOtherWorkArticle = sinon.spy();
      wrapper = shallow(<OtherWork {..._props} />);
      const lastArticle = wrapper.find('.article-card').last();
      const lastArticleButton = lastArticle.find(Link).last();
      lastArticleButton.simulate('click');
      expect(_props.onSetSelectedOtherWorkArticle).to.have.been.called;
      const expectedArticle = mockOtherWorkArticles[mockOtherWorkArticles.length - 1];
      expect(_props.onSetSelectedOtherWorkArticle).to.have.been.calledWith(expectedArticle);
    });
  });

  describe('when promiseLoading is false', () => {
    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Other Work</h2>
      );
      expect(actual).to.equal(true);
    });
    it('should render a create button', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='other-work/create' className='btn'>Create</Link>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when no articles', () => {
    it('should render a message with button link', () => {
      const wrapper = shallow(
        <OtherWork
          articles={[]}
          onFetchOtherWorkArticles={() => { }}
          onSetSelectedOtherWorkArticle={() => { }}
        />
      );
      const actual = wrapper.containsMatchingElement(
        <EmptyArticlesMessage type='other-work' />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('componentWillMount', () => {
    it('should call onFetchOtherWorkArticles when articles === null', () => {
      props.onFetchOtherWorkArticles = sinon.spy();
      props.articles = null;
      wrapper = shallow(<OtherWork {...props} />);
      expect(props.onFetchOtherWorkArticles.calledOnce).to.eq(true);
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<OtherWork {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
