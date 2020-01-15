import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedArticleCreate, { ArticleCreate } from './index';
import NewsForm from '../../../components/NewsForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import FormSuccess from '../../../components/FormElements/FormSuccess';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) News - ArticleCreate', () => {
  let wrapper,
  props = {
    onPostArticle: () => {},
    resetPromiseState: () => {},
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

    describe('handleOnReset', () => {
      it('should call resetPromiseState', () => {
        const resetPromiseStateSpy = sinon.spy();
        wrapper.setProps({
          resetPromiseState: resetPromiseStateSpy
        });
        wrapper.instance().handleOnReset();
        expect(resetPromiseStateSpy).to.have.been.calledOnce;
      });
    });

  });

  describe('rendering', () => {
    it('should render a NewsForm', () => {
      const actual = wrapper.containsMatchingElement(
        <NewsForm
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

      it('should render <FormSuccess /', () => {
        const actual = wrapper.containsMatchingElement(
          <FormSuccess
            title='News'
            createCopy='Create another article'
            onReset={wrapper.instance().handleOnReset}
          />
        );
        expect(actual).to.equal(true);
      });
    });
  });

  describe('ConnectedArticleCreate', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false,
        promiseSuccess: false
      },
      location: {},
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedArticleCreate
          store={store}
          location={mockStoreState.location}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.promiseSuccess).to.eq(selectUiStateSuccess(mockStoreState));
      expect(renderedProps.location).to.eq(mockStoreState.location);
    });
  });
});
