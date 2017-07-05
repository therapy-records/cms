import React from 'react'
import { Home } from 'routes/Home/components/Home'
import { shallow } from 'enzyme'

describe('(Component) Home', () => {
  let props, wrapper

  describe('when !isAuthenticated', () => {
    beforeEach(() => {
      props = {
        isAuthenticated: false,
        onAuthCheck: () => {},
        onPostForm: sinon.spy()
      }
      wrapper = shallow(<Home {...props} />)
    });

    it('should render LoginForm reduxForm', () => {
      const reduxForm = wrapper.find('ReduxForm');
      expect(reduxForm).to.have.length(1);
      const reduxFormIsAuth = reduxForm.prop('isAuthenticated');
      expect(reduxFormIsAuth).to.be.false;
    });

    // todo: test onPostForm prop & call
  });

  describe('when isAuthenticated', () => {
    beforeEach(() => {
      props = {
        isAuthenticated: true,
        onAuthCheck: () => {}
      }
      wrapper = shallow(<Home {...props} />)
    });

    it('should render copy', () => {
      const actual = wrapper.containsMatchingElement(
        <p>already logged in, redirecting...</p>
      );
      expect(actual).to.be.true;
    });

    // it should call props.onAuthCheck

    // should change browserHistory
  });
});
