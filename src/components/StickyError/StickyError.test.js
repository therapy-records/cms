import React from 'react';
import {StickyError} from './StickyError';
import Sticky from '../Sticky/Sticky';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) StickyError', () => {
  let wrapper,
    props = {
      message: 'Something has gone wrong'
    };

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<StickyError {...props} />);
    });

    it('should render <Sticky /> with props.message', () => {
      const actual = wrapper.containsMatchingElement(
        <Sticky>
          <p>{props.message}</p>
        </Sticky>
      );
      expect(actual).to.eq(true);
    });

    describe('when there is no props.message', () => {
      it('should not render', () => {
        wrapper.setProps({message: ''});
        expect(wrapper.type()).to.eq(null);
      });
    });

  });
});
