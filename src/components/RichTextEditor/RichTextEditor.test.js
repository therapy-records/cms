import React from 'react'

import _RichTextEditor from './RichTextEditor';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) RichTextEditor', () => {
  let wrapper,
    props = {
      onChange: () => {}
    },
    onChangeSpy;

  describe('methods', () => {
    describe('onChange', () => {
      beforeEach(() => {
        wrapper = shallow(<_RichTextEditor {...props} />);
        onChangeSpy = sinon.spy();
        wrapper.setProps({
          onChange: onChangeSpy
        });
      });

      it('should set correct state', () => {
        const mockValue = 'testing';
        expect(wrapper.instance().state.value).to.exist;
        wrapper.instance().onChange(mockValue);
        expect(wrapper.instance().state.value).to.eq(mockValue);
      });

      it('should call props.onChange', () => {
        const mockValue = 'testing';
        wrapper.instance().onChange(mockValue);
        expect(onChangeSpy).to.have.been.calledOnce;
        expect(onChangeSpy).to.have.been.calledWith(mockValue.toString('html'));
      });
    });
  });
});
