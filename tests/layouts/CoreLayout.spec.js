import React from 'react'
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import Header from 'components/Header/Header.container'

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
})
