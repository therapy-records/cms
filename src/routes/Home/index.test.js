import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Home } from './index'

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Home', () => {
  let wrapper,
      props,
      baseProps = {
        isAuthenticated: false,
        onAuthCheck: () => { },
        onPostForm: sinon.spy(),
        history: []
      };

  describe('when !isAuthenticated', () => {
    beforeEach(() => {
      props = {
        ...baseProps
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
        ...baseProps,
        isAuthenticated: true
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
