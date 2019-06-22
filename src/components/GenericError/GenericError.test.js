import React from 'react';
import {GenericError} from './GenericError';
import Sticky from '../Sticky/Sticky';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GenericError', () => {
  let wrapper,
    props = {
      message: 'something has gone wrong'
    };

  describe('rendering', () => {
    beforeEach(() => {
      wrapper = shallow(<GenericError {...props} />);
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
