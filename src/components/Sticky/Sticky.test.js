import React from 'react';
import Sticky from './Sticky';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) Sticky', () => {
  let wrapper,
  props = {
    children: <p>test</p>
  };

  describe('rendering', () => {
      beforeEach(() => {
        wrapper = shallow(<Sticky {...props} />);
      });

      it('should render children', () => {
        const actual = wrapper.containsMatchingElement(props.children)
        expect(actual).to.eq(true);
      });
    });
});
