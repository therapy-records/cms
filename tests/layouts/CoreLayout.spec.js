import React from 'react'
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Header from 'components/Header/Header.container'
import Unauthorised from 'components/Unauthorised/Unauthorised'

function shallowRender(component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CoreLayout {...props} />)
}

describe('(Layout) Core', () => {
  let component
  let _props
  let _child

  beforeEach(() => {
    _child = <h1 className='child'>Child</h1>
    _props = {
      children : _child
    }

    component = shallowRenderWithProps(_props)
  })

  it('should render as a <div>.', () => {
    expect(component.type).to.equal('div')
  });

  describe('when there is a `fullScreenView`', () => {
    it('should render a root div with the correct className`s', () => {
      const props = { location: { pathname: '/' } };
      component = shallow(<CoreLayout {...props} />);
      const actual = component.containsMatchingElement(
        <div className='container core-layout-main-container cancel-padding'>
          <Header />
          <div />
        </div>
      );
      expect(actual).to.eq(true);
    });

    it('should render a child div with the correct className`s', () => {
      const props = { location: { pathname: '/' } };
      component = shallow(<CoreLayout {...props} />);
      const actual = component.containsMatchingElement(
        <div className='core-layout-full-screen' />
      );
      expect(actual).to.eq(true);
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
