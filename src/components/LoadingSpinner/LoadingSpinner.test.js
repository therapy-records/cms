import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import LoadingSpinner from './LoadingSpinner'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) LoadingSpinner', () => {
  let wrapper,
    props = {
      active: false,
      fullScreen: true
    };

  describe('when fullScreen', () => {
    beforeEach(() => {
      wrapper = shallow(<LoadingSpinner {...props} />)
    });

    it('should render Spinner with wrapping div', () => {
      const overlay = wrapper.find('.loading-spinner-overlay');
      expect(overlay.length).to.equal(1);
      const circleElm = overlay.find('.sk-circle');
      expect(circleElm.length).to.eq(1);
    });
  });

  describe('when fullScreen and active', () => {
    beforeEach(() => {
      wrapper = shallow(<LoadingSpinner {...props} />)
      wrapper.setProps({
        active: true
      });
    });

    it('should render Spinner with wrapping div and active className ', () => {
      const overlay = wrapper.find('.loading-spinner-overlay .loading-spinner-overlay-active');
      expect(overlay.length).to.equal(1);
      const circleElm = overlay.find('.sk-circle');
      expect(circleElm.length).to.eq(1);
    });
  });

  describe('default', () => {
    beforeEach(() => {
      wrapper = shallow(<LoadingSpinner {...props} />)
      wrapper.setProps({
        active: false,
        fullScreen: false
      });
    });

    it('should render Spinner with no wrapping div', () => {
      const overlay = wrapper.find('.loading-spinner-overlay');
      expect(overlay.length).to.equal(0);
      const circleElm = wrapper.find('.sk-circle');
      expect(circleElm.length).to.eq(1);
    });
  });
 
});
