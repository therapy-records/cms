import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { bindActionCreators } from 'redux'
import { Header } from './Header'
import { NavLink } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Header', () => {
  let wrapper,
      props = {
        onLogout: () => {}
      };

  describe('when !isAuthenticated', () => {
    beforeEach(() => {
      wrapper = shallow(<Header {...props} />)
    });

    it('should render a title', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/' activeClassName='route--active'>FR-CMS</NavLink>
      );
      expect(actual).to.equal(true);
    });

    it('should render a login link', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/' activeClassName='route--active'>Log in</NavLink>
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when isLoginPage', () => {
    it('should not render a login link', () => {
      wrapper.setProps({
        location: { pathname: '/' }
      });
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/' activeClassName='route--active'>Log in</NavLink>
      );
      expect(actual).to.equal(false);
    });
  });

  describe('when isAuthenticated', () => {
    beforeEach(() => {
      props = {
        isAuthenticated: true,
        onLogout: () => {}
      }
      wrapper = shallow(<Header {...props} />)
    });

    it('should render auth only links', () => {
      const actual1 = wrapper.containsMatchingElement(
        <NavLink to='/dashboard' activeClassName='route--active'>
          Dashboard
        </NavLink>
      );
      expect(actual1).to.equal(true);
      const actual2 = wrapper.containsMatchingElement(
        <NavLink to='/news' activeClassName='route--active'>
          News
        </NavLink>
      );
      expect(actual2).to.equal(true);
      const actual3 = wrapper.containsMatchingElement(
        <NavLink to='/press' activeClassName='route--active'>
          Press
        </NavLink>
      );
      expect(actual3).to.equal(true);
    });

    describe('logout link', () => {
      it('should be rendered', () => {
        const actual = wrapper.containsMatchingElement(
          <button className='btn-logout'>Log out</button>
        );
        expect(actual).to.equal(true);
      });

      it('should call dispatch and onLogout on click', () => {
        const onLogoutSpy = sinon.spy();
        props = {
          isAuthenticated: true,
          onLogout: onLogoutSpy
        }
        const buttonWrapper = shallow(<Header {...props} />)
        expect(onLogoutSpy.calledOnce).to.eq(false);
        const button = buttonWrapper.find('button');
        button.simulate('click');
        expect(onLogoutSpy.calledOnce).to.eq(true);
      });
    });
  });
})
