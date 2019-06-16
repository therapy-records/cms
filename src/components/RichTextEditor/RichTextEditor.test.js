import React from 'react'

import _RichTextEditor from './RichTextEditor';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) RichTextEditor', () => {
  let wrapper,
    props = {
      input: {
        onChange: () => {}
      },
      title: 'Test title',
      meta: {
        touched: false,
        error: ''
      }
    },
    onChangeSpy;

  describe('methods', () => {
    describe('onChange', () => {
      beforeEach(() => {
        wrapper = shallow(<_RichTextEditor {...props} />);
        onChangeSpy = sinon.spy();
        wrapper.setProps({
          input: {
            onChange: onChangeSpy
          }
        });
      });

      it('should set correct state', () => {
        const mockValue = 'testing';
        expect(wrapper.instance().state.value).to.exist;
        wrapper.instance().onChange(mockValue);
        expect(wrapper.instance().state.value).to.eq(mockValue);
      });

      it('should render a title', () => {
        const actual = wrapper.containsMatchingElement(
          <h5>{props.title}</h5>
        );
        expect(actual).to.eq(true);
      });

      it('should call props.input.onChange', () => {
        const mockValue = 'testing';
        wrapper.instance().onChange(mockValue);
        expect(onChangeSpy).to.have.been.calledOnce;
        expect(onChangeSpy).to.have.been.calledWith(mockValue.toString('html'));
      });
    });
  });
});
