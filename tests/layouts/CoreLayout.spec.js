import React from 'react'
import { shallow } from 'enzyme'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Header from 'components/Header/Header.container'
import Unauthorised from 'components/Unauthorised/Unauthorised'

describe('(Layout) Core', () => {
  let component;

  it('should render as a <div>', () => {
    const props = { location: { pathname: '/' } };
    component = shallow(<CoreLayout {...props} />);
    const actual = component.find('div.core-layout-main-container');
    expect(actual.length).to.eq(1);
  });

  it('should render a Header', () => {
    const props = { location: { pathname: '/' } };
    component = shallow(<CoreLayout {...props} />);
    const actual = component.containsMatchingElement(
      <Header />
    );
    expect(actual).to.eq(true);
  });

  describe('when there is a `fullScreenView`', () => {
    let props,
        component;
    beforeEach(() => {
      props = { location: { pathname: '/' } };
      component = shallow(<CoreLayout {...props} />);
    });

    it('should render child divs with the correct className`s', () => {
      const props = { location: { pathname: '/' } };
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

  describe('when isAuthenticated', () => {
    const props = {
      isAuthenticated: true,
      children: <div><p>testing</p></div>
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

  describe('when isAuthenticated', () => {
    const props = {
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
