import React from 'react'

import _RichTextEditor from './RichTextEditor';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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

  beforeEach(() => {
    wrapper = shallow(<_RichTextEditor {...props} />);
  });

  describe('methods', () => {
    describe('handleOnChange', () => {
      beforeEach(() => {
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
        wrapper.instance().handleOnChange(mockValue);
        expect(wrapper.instance().state.value).to.eq(mockValue);
      });

      it('should call props.input.onChange', () => {
        const mockValue = 'testing';
        wrapper.instance().handleOnChange(mockValue);
        expect(onChangeSpy).to.have.been.calledOnce;
        expect(onChangeSpy).to.have.been.calledWith(mockValue.toString('html'));
      });
    });
  });

  describe('rendering', () => {
    it('should render a title', () => {
      const actual = wrapper.containsMatchingElement(
        <h5>{props.title}<span className='required'>*</span></h5>
      );
      expect(actual).to.eq(true);
    });

    describe('when there is props.meta.touched and props.meta.error', () => {
      it('should render the error', () => {
        const mockError = 'required';
        wrapper.setProps({
          meta: {
            touched: true,
            error: mockError
          }
        });
        const actual = wrapper.containsMatchingElement(
          <p>Copy is {mockError}</p>
        );
        expect(actual).to.eq(true);
      });
    });

    describe('when there is props.showSingleHiddenInputValue and a value in state', () => {
      it('should render a hidden input with value as HTML string', () => {
        const mockValue = 'test value';
        const mockName = 'myField';
        wrapper = shallow(
          <_RichTextEditor
            name={mockName}
            showSingleHiddenInputValue
            value={mockValue}
          />
        );

        const actual = wrapper.containsMatchingElement(
          <input
            type='hidden'
            name={mockName}
            value={mockValue}
          />
        );
        expect(actual).to.eq(true);
      });
    });

  });

});
