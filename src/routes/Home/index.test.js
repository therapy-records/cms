import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedHome, { Home } from './index'
import LoadingSpinner from '../../components/LoadingSpinner';
import { selectUiStateLoading } from '../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Home', () => {
  let wrapper;
  const baseProps = {
    isAuth: false,
    onAuthCheck: () => {},
    onPostForm: sinon.spy(),
    history: {
      push: jest.fn()
    },
    location: {}
  };
  let props = baseProps;

  describe('rendering', () => {
    describe('when isAuth is false', () => {
      beforeEach(() => {
        props.isAuth = false;
        wrapper = shallow(<Home {...props} />)
      });

      it('should render LoginForm', () => {
        const reduxForm = wrapper.find('ReduxForm');
        expect(reduxForm.length).to.eq(1);
        expect(reduxForm.prop('isAuth')).to.eq(props.isAuth);
        expect(reduxForm.prop('authError')).to.eq(props.authError);
        expect(reduxForm.prop('promiseLoading')).to.eq(props.promiseLoading);
        expect(reduxForm.prop('onSubmit')).to.eq(props.onPostForm);
      });
    });

    describe('when isAuth is null (i.e, not chceked)', () => {
      beforeEach(() => {
        props.isAuth = null;
        wrapper = shallow(<Home {...props} />)
      });

      it('should render <LoadingSpinner />', () => {
        const actual = wrapper.containsMatchingElement(
          <LoadingSpinner
            active
            fullScreenIgnoreSidebar
          />
        );
        expect(actual).to.be.true;
      });
    });

    describe('when isAuth is true', () => {
      beforeEach(() => {
        props = {
          ...baseProps,
          isAuth: true
        }
        wrapper = shallow(<Home {...props} />)
      });

      it('should render <LoadingSpinner />', () => {
        const actual = wrapper.containsMatchingElement(
          <LoadingSpinner
            active
            fullScreenIgnoreSidebar
          />
        );
        expect(actual).to.be.true;
      });
    });
  });

  describe('methods', () => {

    describe('componentDidMount', () => {
      describe('when isAuth is false', () => {
        it('should call props.onAuthCheck', () => {
          const onAuthCheckSpy = sinon.spy();
          wrapper = shallow(<Home {...props} />);
          wrapper.setProps({
            isAuth: false,
            onAuthCheck: onAuthCheckSpy
          });

          wrapper.instance().componentDidMount();
          expect(onAuthCheckSpy).to.have.been.calledOnce;
        });
      });
    });

    describe('componentDidUpdate', () => {
      let doRedirectSpy;
      beforeEach(() => {
        doRedirectSpy = sinon.spy();
        wrapper = shallow(<Home {...props} />);
        wrapper.instance().doRedirect = doRedirectSpy;

        const mockPrevProps = { isAuth: false };
        wrapper.setProps(mockPrevProps);
        wrapper.instance().componentDidUpdate(mockPrevProps);
      });

      describe('when props.isAuth is true', () => {

        it('should call doRedirect', () => {
          wrapper.setProps({
            isAuth: true
          });
          expect(doRedirectSpy).to.have.been.called;
          expect(doRedirectSpy).to.have.been.calledWith('/dashboard');
        });

        describe('when there is a previous pathname in props', () => {
          it('should call doRedirect with previous pathname', () => {
            const mockPathname = '/test';
            wrapper.setProps({
              isAuth: true,
              location: {
                state: {
                  from: { pathname: mockPathname }
                }
              }
            });
            expect(doRedirectSpy).to.have.been.called;
            expect(doRedirectSpy).to.have.been.calledWith(mockPathname);
          });
        });

      });
    });

    describe('doRedirect', () => {
      it('should call props.history.push with given param', () => {
        const mockPathname = '/test';
        const historyPushSpy = sinon.spy();
        wrapper = shallow(
          <Home
            {...props}
            history={{
              ...props.history,
              push: historyPushSpy
            }}
          />
        );
        wrapper.instance().doRedirect(mockPathname);
        expect(historyPushSpy).to.have.been.calledOnce;
        expect(historyPushSpy).to.have.been.calledWith({
          pathname: mockPathname
        });
      });

    });

  });

  describe('ConnectedArticle', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      uiState: {
        promiseLoading: false
      },
      user: {
        isAuth: false,
        authError: ''
      },
      location: {},
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedHome
          store={store}
          location={mockStoreState.location}
          history={{}}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.isAuth).to.eq(mockStoreState.user.isAuth);
      expect(renderedProps.authError).to.eq(mockStoreState.user.authError);
    });
  });

});
