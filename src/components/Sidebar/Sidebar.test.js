import React from 'react';
import { NavLink } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Sidebar } from './Sidebar';

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
      <NavLink to='/dashboard'>FR-CMS</NavLink>
    );
    expect(actual).to.equal(true);
  });

  describe('active className', () => {
    beforeEach(() => {
      wrapper = shallow(<Sidebar {...props} />)
    });
    describe('when route is not home and window width is >= 900', () => {
      beforeEach(() => {
        global.window.innerWidth = 900;
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
      it('should return null', () => {
        expect(wrapper.type()).to.eq(null);
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

    describe('handleOnClickNavItem', () => {
      it('should call toggleSidebar', () => {
        const toggleSidebarSpy = sinon.spy();
        wrapper.instance().toggleSidebar = toggleSidebarSpy;
        wrapper.instance().handleOnClickNavItem();
        expect(toggleSidebarSpy).to.have.been.called;
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

  it('should render an overlay', () => {
    const actual = wrapper.containsMatchingElement(
      <div
        className='sidebar-overlay'
        onClick={wrapper.instance().toggleSidebar}
      />
    );
    expect(actual).to.eq(true);
  });

  describe('burger button', () => {
    it('should be rendered', () => {
      const actual = wrapper.containsMatchingElement(
        <button
          onClick={wrapper.instance().toggleSidebar}
          className='btn-burger'
        >
          &#9776;
          <span className='sr-only'>Open Menu</span>
        </button>
      );
      expect(actual).to.eq(true);
    });
  });

  describe('close button', () => {
    it('should be rendered', () => {
      const actual = wrapper.containsMatchingElement(
        <button
          onClick={wrapper.instance().toggleSidebar}
          className='btn-close'
        >x</button>
      );
      expect(actual).to.eq(true);
    });
  });

  describe('nav items', () => {
    it('should render a link to dashboard', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink
          to='/dashboard'
          activeClassName='route--active'
          onClick={wrapper.instance().handleOnClickNavItem}
        >
          🏠 Dashboard
        </NavLink>
      );
      expect(actual).to.eq(true);
    });

    it('should render a link to dashboard', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink
          to='/news'
          activeClassName='route--active'
          onClick={wrapper.instance().handleOnClickNavItem}
        >
          🗞️ News
        </NavLink>
      );
      expect(actual).to.eq(true);
    });

    it('should render a link to journalism', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink
          to='/journalism'
          activeClassName='route--active'
          onClick={wrapper.instance().handleOnClickNavItem}
        >
          ✍️ Journalism
        </NavLink>
      );
      expect(actual).to.eq(true);
    });

    it('should render a link to press', () => {
      const actual = wrapper.containsMatchingElement(
        <NavLink
          to='/press'
          activeClassName='route--active'
          onClick={wrapper.instance().handleOnClickNavItem}
        >
          📢 Press
        </NavLink>
      );
      expect(actual).to.eq(true);
    });
  });

  describe('logout button', () => {
    beforeEach(() => {
      props.location.pathname = '/test';
      wrapper = shallow(<Sidebar {...props} />)
    });
    it('should be rendered', () => {
      const actual = wrapper.containsMatchingElement(
        <button className='btn-logout'>📪 Log out</button>
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
