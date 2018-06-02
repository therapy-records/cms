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

  describe('active className', () => {
    beforeEach(() => {
      wrapper = shallow(<Sidebar {...props} />)
    });
    describe('when route is not home and window width is >= 768', () => {
      beforeEach(() => {
        global.window.innerWidth = 768;
      });
      it('should render correct active className', () => {
        const aside = wrapper.find('aside');
        expect(aside.prop('className')).to.eq('sidebar sidebar-active');
      });
    });

    describe('when route is not home and state.isOpen', () => {
      beforeEach(() => {
        wrapper.instance().setState({
          isOpen: true
        });
      });
      it('should render correct active className', () => {
        const aside = wrapper.find('aside');
        expect(aside.prop('className')).to.eq('sidebar sidebar-active');
      });
    });

    describe('when route is not home and state.isOpen and window width is `not large`', () => {
      beforeEach(() => {
        global.window.innerWidth = 400;
        wrapper.instance().setState({
          isOpen: true
        });
      });
      it('should render correct active className', () => {
        const aside = wrapper.find('aside');
        expect(aside.prop('className')).to.eq('sidebar sidebar-active');
      });
    });

    describe('when route is home', () => {
      beforeEach(() => {
        wrapper.setProps({
          location: { pathname: '/' }
        });
      });
      it('should render not render active className', () => {
        const aside = wrapper.find('aside');
        expect(aside.prop('className')).to.eq('sidebar');
        expect(aside.prop('className')).to.not.eq('sidebar sidebar-active');
      });
    });    
  });

  describe('methods', () => {
    beforeEach(() => {
      wrapper = shallow(<Sidebar {...props} />)
    });
    describe('toggleSidebar', () => {
      it('should update state', () => {
        wrapper.instance().toggleSidebar();
        expect(wrapper.instance().state.isOpen).to.eq(true);
        wrapper.instance().toggleSidebar();
        expect(wrapper.instance().state.isOpen).to.eq(false);
        wrapper.instance().toggleSidebar();
        expect(wrapper.instance().state.isOpen).to.eq(true);
      });
    });
    describe('componentDidMount', () => {
      it('should call handleResize', () => {
        const handleResizeSpy = sinon.spy();
        wrapper.instance().handleResize = handleResizeSpy;
        wrapper.instance().componentDidMount();
        expect(handleResizeSpy.calledOnce).to.eq(true);
      });
      it('should add window event listener', () => {
        const addEventListenerSpy = sinon.spy();
        global.window.addEventListener = addEventListenerSpy;
        wrapper.instance().componentDidMount();
        expect(addEventListenerSpy.calledOnce).to.eq(true);
        expect(addEventListenerSpy).to.have.been.calledWith(
          'resize', wrapper.instance().handleResize
        );
      });
    });
    
    describe('componentWillUnmount', () => {
      it('should remove window event listener', () => {
        const removeEventListenerSpy = sinon.spy();
        global.window.removeEventListener = removeEventListenerSpy;
        wrapper.instance().componentWillUnmount();
        expect(removeEventListenerSpy.calledOnce).to.eq(true);
        expect(removeEventListenerSpy).to.have.been.calledWith(
          'resize', wrapper.instance().handleResize
        );
      });
    });
  });
 
  describe('nav items', () => {
    it('should render a link to dashboard', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/dashboard' activeClassName='route--active'>
          Dashboard
        </NavLink>
      );
      expect(actual).to.eq(true);
    });

    it('should render a link to dashboard', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/news' activeClassName='route--active'>
          News
        </NavLink>
      );
      expect(actual).to.eq(true);
    });

    it('should render a link to other work', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/other-work' activeClassName='route--active'>
          Other Work
        </NavLink>
      );
      expect(actual).to.eq(true);
    });

    it('should render a link to press', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink to='/press' activeClassName='route--active'>
          Press
        </NavLink>
      );
      expect(actual).to.eq(true);
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
      const button = buttonWrapper.find('.btn-logout');
      button.simulate('click');
      expect(onLogoutSpy.calledOnce).to.eq(true);
    });
  });
});
