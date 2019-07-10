import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom'
import { ArticleCreate } from './index';
import JournalismArticleForm from '../../../components/JournalismArticleForm';
import LoadingSpinner from '../../../components/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Journalism - ArticleCreate', () => {
  let wrapper,
    props = {
      onPostArticle: () => { },
      onAddArticleSection: () => { },
      resetPromiseState: () => { },
      location: {}
    };

  beforeEach(() => {
    wrapper = shallow(<ArticleCreate {...props} />);
  });

  describe('methods', () => {
    describe('componentWillUnmount', () => {
      it('should call resetPromiseState', () => {
        const resetPromiseStateSpy = sinon.spy();
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy
        });
        wrapper.instance().componentWillUnmount();
        expect(resetPromiseStateSpy).to.have.been.calledOnce;
      });
    });
  });

  describe('rendering', () => {
    it('should render a JournalismArticleForm', () => {
      const actual = wrapper.containsMatchingElement(
        <JournalismArticleForm
          onSubmitForm={props.onPostArticle}
          location={props.location}
        />
      );
      expect(actual).to.equal(true);
    });

    describe('when promise is loading', () => {
      it('should show loading', () => {
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
    });

    describe('when article is successfully posted and promise not loading', () => {
      beforeEach(() => {
        wrapper.setProps({
          promiseLoading: false,
          promiseSuccess: true
        });
      });

      it('should render success message and link', () => {
        const actual = wrapper.containsMatchingElement(
          <h2>Successfully created! <small>🚀</small></h2>
        );
        expect(actual).to.equal(true);
      });

      it('should render a link to journalism page', () => {
        const actual = wrapper.containsMatchingElement(
          <Link to='/journalism' className='btn'>Go to Journalism</Link>
        );
        expect(actual).to.eq(true);
      });

      it('should render a link to journalism/create', () => {
        const actual = wrapper.containsMatchingElement(
          <Link to='/journalism/create' className='btn'>Create another article</Link>
        );
        expect(actual).to.eq(true);
      });
    });
  });
});
