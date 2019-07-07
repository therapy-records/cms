import React from 'react'

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Home } from './index'
import LoadingSpinner from '../../components/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Home', () => {
  let wrapper;
  const baseProps = {
    isAuth: false,
    onAuthCheck: () => { },
    onPostForm: sinon.spy(),
    history: {
      push: () => {}
    },
    location: {}
  };
  let props = baseProps;

  describe('when isAuth is null', () => {
    beforeEach(() => {
      props.isAuth = null;
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

  describe('when isAuth is false', () => {
    beforeEach(() => {
      props.isAuth = false;
      wrapper = shallow(<Home {...props} />)
    });

    it('should render LoginForm reduxForm', () => {
      const reduxForm = wrapper.find('ReduxForm');
      expect(reduxForm).to.have.length(1);
      const reduxFormIsAuth = reduxForm.prop('isAuth');
      expect(reduxFormIsAuth).to.be.false;
    });
  });

  describe('when isAuth', () => {
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
          props.history = [{ pathname: 'test' }];

          wrapper = shallow(<Home {...props} />);
          wrapper.setProps({
            location: {
              state: {
                from: { pathname: 'random-route' }
              }
            }
          });
          const lastHistoryObj = props.history[props.history.length - 1];
          expect(lastHistoryObj.pathname).to.eq('random-route');
        });

        describe('when isAuth is false', () => {
          it('should not push from.pathname', () => {
            props.isAuth = false;
            props.history = [{ pathname: 'test' }];
            wrapper = shallow(<Home {...props} />);
            wrapper.setProps({
              isAuth: false,
              location: {
                state: {
                  from: { pathname: 'test' }
                }
              }
            });
            const lastHistoryObj = props.history[props.history.length - 1];
            expect(lastHistoryObj.pathname).to.eq('test');
          });
        });
      });

      describe('when there is no location.state.from.pathname', () => {
        it('should push `/dashboard` to props.history', () => {
          props.location = {};
          wrapper = shallow(<Home {...props} />);
          wrapper.setProps({
            isAuth: true
          });
          const lastHistoryObj = props.history[props.history.length - 1];
          expect(lastHistoryObj.pathname).to.eq('/dashboard');
        });
      });
    });

  });
});
