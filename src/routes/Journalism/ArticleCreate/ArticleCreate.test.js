import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedArticleCreate, { ArticleCreate } from './index';
import JournalismForm from '../../../components/JournalismForm';
import SuccessMessage from '../../../components/FormElements/SuccessMessage';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  selectUiStateLoading,
  selectUiStateSuccess
} from '../../../selectors/uiState';

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
    it('should render a JournalismForm', () => {
      const actual = wrapper.containsMatchingElement(
        <JournalismForm
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

      it('should render <SuccessMessage />', () => {
        const actual = wrapper.containsMatchingElement(
          <SuccessMessage
            baseUrl='/journalism'
            copy={{
              homeLink: 'Go to Journalism',
              createLink: 'Create another article',
            }}
            onReset={wrapper.instance().handleOnReset}
          />
        );
        expect(actual).to.equal(true);
      });
    });
  });

  describe('ConnectedArticle', () => {
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
