import React from 'react';
import StickyError from './';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) StickyError', () => {
  let wrapper,
  props = {
    children: <p>test</p>
  };

  describe('rendering', () => {
      beforeEach(() => {
        wrapper = shallow(<StickyError {...props} />);
      });

      it('should render children', () => {
        const actual = wrapper.containsMatchingElement(props.children)
        expect(actual).to.eq(true);
      });
    });
});
