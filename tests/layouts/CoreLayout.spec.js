import React from 'react'
import { shallow } from 'enzyme'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Header from 'components/Header/Header.container'
import Unauthorised from 'components/Unauthorised/Unauthorised'

describe('(Layout) Core', () => {
  let component,
      baseProps = {
        routes: [
          { status: 200 }
        ]
      };

  it('should render as a <div>', () => {
    const props = { ...baseProps, location: { pathname: '/' } };
    component = shallow(<CoreLayout {...props} />);
    const actual = component.find('div.core-layout-main-container');
    expect(actual.length).to.eq(1);
  });

  it('should render a Header', () => {
    const props = { ...baseProps, location: { pathname: '/' } };
    component = shallow(<CoreLayout {...props} />);
    const actual = component.containsMatchingElement(
      <Header />
    );
    expect(actual).to.eq(true);
  });

  describe('when `fullScreenView`', () => {
    let props,
        component;
    beforeEach(() => {
      props = { ...baseProps, location: { pathname: '/' } };
      component = shallow(<CoreLayout {...props} />);
    });

    it('should render child divs with the correct className`s', () => {
      const props = { ...baseProps, location: { pathname: '/' } };
      component = shallow(<CoreLayout {...props} />);
      const actual = component.find('.core-layout-full-screen');
      expect(actual.length).to.eq(1);
    });
    it('should not render a main-content-wrapper className', () => {
      const actual = component.containsMatchingElement(
        <div className='main-content-wrapper' />
      );
      expect(actual).to.eq(false);
    });
  });

  describe('when `isErrorPage`', () => {
    let props,
        component;
    beforeEach(() => {
      props = {
        ...baseProps,
        location: { pathname: '/some/error' },
        routes: [
          { status: 404 }
        ],
        children: <div><p>test</p></div>
      };
      component = shallow(<CoreLayout {...props} />);
    });

    it('should render children', () => {
      const actual = component.containsMatchingElement(
        props.children
      );
      expect(actual).to.equal(true);
    });
    it('should not render Unauthorised', () => {
      const actual = component.containsMatchingElement(
        <Unauthorised />
      );
      expect(actual).to.eq(false);
    });
  });

  describe('when isAuthenticated', () => {
    const props = {
      ...baseProps,
      isAuthenticated: true,
      children: <div><p>test</p></div>
    }
    beforeEach(() => {
      component = shallow(<CoreLayout {...props} />);
    });
    it('should render children', () => {
      const actual = component.containsMatchingElement(
        props.children
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when !isAuthenticated and route is an allowed unauth route', () => {
    const props = {
      ...baseProps,
      isAuthenticated: false,
      children: <div><p>hello</p></div>,
      location: {
        pathname: '/'
      }
    }
    beforeEach(() => {
      component = shallow(<CoreLayout {...props} />);
    });
    it('should render children', () => {
      const actual = component.containsMatchingElement(
        props.children
      );
      expect(actual).to.equal(true);
    });
  });

  describe('when !isAuthenticated and route is not an allowed route', () => {
    const props = {
      ...baseProps,
      isAuthenticated: false,
      children: <div><p>hello</p></div>,
      location: {
        pathname: '/something'
      }
    }
    beforeEach(() => {
      component = shallow(<CoreLayout {...props} />);
    });
    it('should not render children', () => {
      const actual = component.containsMatchingElement(
        props.children
      );
      expect(actual).to.equal(false);
    });

    it('should render Unauthorised component', () => {
      const actual = component.containsMatchingElement(
        <Unauthorised />
      );
      expect(actual).to.equal(true);
    });
  });
});
