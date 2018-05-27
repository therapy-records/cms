import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Sidebar } from './Sidebar'
import { NavLink } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Sidebar', () => {
  let wrapper,
    props = {
      onLogout: () => { },
      location: {
        pathname: '/testing'
      }
    };

  it('should render a title', () => {
    wrapper = shallow(<Sidebar {...props} />)
    const actual = wrapper.containsMatchingElement(
      <NavLink to='/'>FR-CMS</NavLink>
    );
    expect(actual).to.equal(true);
  });

  it('should render active className', () => {
    const aside = wrapper.find('aside');
    expect(aside.prop('className')).to.eq('sidebar sidebar-active');
  });


  describe('when isHome', () => {
    beforeEach(() => {
      props.location.pathname = '/';
      wrapper = shallow(<Sidebar {...props} />)
    });

    it('should render className without active', () => {
      const aside = wrapper.find('aside');
      expect(aside.prop('className')).to.eq('sidebar');
    });
  });

  describe('logout link', () => {
    beforeEach(() => {
      props.location.pathname = '/test';
      wrapper = shallow(<Sidebar {...props} />)
    });
    it('should be rendered', () => {
      const actual = wrapper.containsMatchingElement(
        <button className='btn-logout'>Log out</button>
      );
      expect(actual).to.equal(true);
    });

    it('should call dispatch and onLogout on click', () => {
      const onLogoutSpy = sinon.spy();
      props.isAuthenticated = true;
      props.onLogout = onLogoutSpy;
      const buttonWrapper = shallow(<Sidebar {...props} />)
      expect(onLogoutSpy.calledOnce).to.eq(false);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      expect(onLogoutSpy.calledOnce).to.eq(true);
    });
  });
});
