import React from 'react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
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

    describe('componentWillReceiveProps', () => {
      describe('when there is location.state.from.pathname', () => {
        it('should push from.pathname to props.history', () => {
          props.location = {
            state: {
              from: { pathname: 'test' }
            }
          };
          const historyPushSpy = sinon.spy();
          props.history.pathname = 'test';
          

          wrapper = shallow(<Home {...props} />);
          wrapper.setProps({
            location: {
              state: {
                from: { pathname: 'random-route' }
              }
            },
            history: {
              ...props.history,
              push: historyPushSpy
            }
          });
          expect(historyPushSpy).to.have.been.calledWith({
            pathname: 'random-route'
          });
        });

        describe('when isAuth is true', () => {
          it('should not push from.pathname', () => {
            const historyPushSpy = sinon.spy();
            wrapper.setProps({
              isAuth: true,
              location: {
                state: {
                  from: { pathname: 'test' }
                }
              },
              history: {
                ...props.history,
                push: historyPushSpy
              }
            });
            expect(historyPushSpy).to.have.been.calledOnce;
            expect(historyPushSpy).to.have.been.calledWith({
              pathname: 'test'
            });
          });
        });
      });

      describe('when there is no location.state.from.pathname', () => {
        it('should push `/dashboard` to props.history', () => {
          props.location = {};
          wrapper = shallow(<Home {...props} />);
          const historyPushSpy = sinon.spy();
          wrapper.setProps({
            isAuth: true,
            history: {
              ...props.history,
              push: historyPushSpy
            }
          });
          expect(historyPushSpy).to.have.been.calledOnce;
          expect(historyPushSpy).to.have.been.calledWith({
            pathname: '/dashboard'
          });
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
      renderedProps = wrapper.props();
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
      expect(renderedProps.isAuth).to.eq(mockStoreState.user.isAuth);
      expect(renderedProps.authError).to.eq(mockStoreState.user.authError);
    });
  });

});
