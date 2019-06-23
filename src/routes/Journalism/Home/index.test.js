import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Journalism } from './index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EmptyArticlesMessage from '../../../components/EmptyArticlesMessage/EmptyArticlesMessage';

Enzyme.configure({ adapter: new Adapter() });

const createJournalismArticles = (ids) => {
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

const mockJournalismArticles = createJournalismArticles([1, 2, 3]);
describe('(Component) Journalism - Home', () => {
  let wrapper,
    props,
    baseProps = {
      onfetchJournalismArticles: sinon.spy(),
      onsetSelectedJournalismArticle: sinon.spy(),
      articles: mockJournalismArticles,
      resetPromiseState: sinon.spy(),
      onSetSelectedNewsArticle: sinon.spy()
    };
  props = baseProps;

  it('should render <LoadingSpinner />', () => {
    wrapper = shallow(<Journalism {...props} />);
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

  it('should render list of journalismArticles', () => {
    wrapper = shallow(<Journalism {...props} />);
    const expectedArticle = (key) => {
      const p = props.articles[key]; // eslint-disable-line
      return (
        <li key={p._id} className='article-card'>
          <img src={p.mainImageUrl} />
          <div>
            <div className='heading-with-btn'>
              <h3>
                <Link
                  to={`journalism/${p._id}`}
                >{p.title}
                </Link>
              </h3>
              {p.releaseDate && <p className='small-tab'>{moment(p.releaseDate).format('DD MMM YYYY')}</p>}
            </div>

            <p>Links to: {p.externalLink}</p>

            <Link
              to={`journalism/${p._id}`}
              className='btn btn-sm'
            >
              View
            </Link>
            <Link
              to={`journalism/${p._id}/edit`}
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
    it('should call onsetSelectedJournalismArticle on `view` button click', () => {
      let _props = baseProps;
      _props.onsetSelectedJournalismArticle = sinon.spy();
      wrapper = shallow(<Journalism {..._props} />);
      const lastArticle = wrapper.find('.article-card').last();
      const lastArticleButton = lastArticle.find(Link).first();
      lastArticleButton.simulate('click');
      expect(_props.onsetSelectedJournalismArticle).to.have.been.called;
      const expectedArticle = mockJournalismArticles[mockJournalismArticles.length - 1];
      expect(_props.onsetSelectedJournalismArticle).to.have.been.calledWith(expectedArticle);
    });

    it('should call onsetSelectedJournalismArticle on `edit` button click', () => {
      let _props = baseProps;
      _props.onsetSelectedJournalismArticle = sinon.spy();
      wrapper = shallow(<Journalism {..._props} />);
      const lastArticle = wrapper.find('.article-card').last();
      const lastArticleButton = lastArticle.find(Link).last();
      lastArticleButton.simulate('click');
      expect(_props.onsetSelectedJournalismArticle).to.have.been.called;
      const expectedArticle = mockJournalismArticles[mockJournalismArticles.length - 1];
      expect(_props.onsetSelectedJournalismArticle).to.have.been.calledWith(expectedArticle);
    });
  });

  describe('when promiseLoading is false', () => {
    it('should render a page title', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Journalism</h2>
      );
      expect(actual).to.equal(true);
    });
    it('should render a create button', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='journalism/create' className='btn'>Create</Link>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when no articles', () => {
    it('should render a message with button link', () => {
      const wrapper = shallow(
        <Journalism
          articles={[]}
          onfetchJournalismArticles={() => { }}
          onsetSelectedJournalismArticle={() => { }}
        />
      );
      const actual = wrapper.containsMatchingElement(
        <EmptyArticlesMessage type='journalism' />
      );
      expect(actual).to.equal(true);
    });
  });

  describe('componentWillMount', () => {
    it('should call onfetchJournalismArticles when articles === null', () => {
      props.onfetchJournalismArticles = sinon.spy();
      props.articles = null;
      wrapper = shallow(<Journalism {...props} />);
      expect(props.onfetchJournalismArticles.calledOnce).to.eq(true);
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<Journalism {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
