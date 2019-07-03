import React from 'react'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Link } from 'react-router-dom'
import { ArticleCreate } from './index'
import NewsArticleForm from '../../../components/NewsArticleForm'
import LoadingSpinner from '../../../components/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleCreate', () => {
  let wrapper,
    props,
    baseProps = {
      onPostArticle: () => {},
      onAddArticleSection: () => {},
      resetPromiseState: () => {},
      location: {}
    };

  it('should call resetPromiseState on componentWillUnmount', () => {
    let props = baseProps;
    props.resetPromiseState = sinon.spy();
    wrapper = shallow(<ArticleCreate {...props} />);
    wrapper.unmount();
    expect(props.resetPromiseState).to.have.been.called;
    expect(props.resetPromiseState).to.have.been.calledOnce;
  });

  it('should render a NewsArticleForm', () => {
    props = baseProps;
    wrapper = shallow(<ArticleCreate {...props} />);
    const actual = wrapper.containsMatchingElement(
      <NewsArticleForm
        onSubmitForm={props.onPostArticle}
        onAddArticleSection={props.onAddArticleSection}
        location={props.location}
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
      props = baseProps;
      props.promiseLoading = false;
      props.promiseSuccess = true;
      wrapper = shallow(<ArticleCreate {...props} />);
    });

    it('should render success message and link', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Successfully created! <small>🚀</small></h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render a link to news page', () => {
      const actual = wrapper.containsMatchingElement(
        <Link to='/news' className='btn'>Go to news</Link>,
      );
      expect(actual).to.eq(true);
    });

    describe('create another article button', () => {
      it('should render', () => {
        const button = wrapper.find('button');
        expect(button.text()).to.eq('Create another article');
      });

      it('should call props.resetPromiseState onClick', () => {
        const resetPromiseStateSpy = sinon.spy();
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy
        });
        const button = wrapper.find('button');
        button.simulate('click');
        expect(resetPromiseStateSpy).to.have.been.calledOnce;
      });
    });
  });

  describe('componentWillUnmount', () => {
    it('should call resetPromiseState', () => {
      props.resetPromiseState = sinon.spy();
      wrapper = shallow(<ArticleCreate {...props} />);
      wrapper.instance().componentWillUnmount();
      expect(props.resetPromiseState).to.have.been.called;
    });
  });
});
