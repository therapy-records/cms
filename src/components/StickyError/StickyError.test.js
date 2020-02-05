import React from 'react';
import StickyError from './';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) StickyError', () => {
  let wrapper,
  props = {
    message: 'test'
  };

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<StickyError {...props} />);
    });

    it('should render copy from message prop', () => {
      const actual = wrapper.containsMatchingElement(
        <p>{props.message}</p>
      );
      expect(actual).to.eq(true);
    });
    
    describe('when props.error contains `Unauthorized`', () => {
      it('should render an unauthorized message', () => {
        wrapper.setProps({
          error: new Error('User is Unauthorized')
        });
        const actual = wrapper.containsMatchingElement(
          <p>You are not authorized to perform this action.</p>
        );
        expect(actual).to.eq(true);
      });
    });

  });
    
});
