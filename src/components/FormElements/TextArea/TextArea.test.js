import React from 'react'
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextArea from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) TextArea', () => {
  let wrapper;
  const props = {
    id: 'test',
    name: 'test',
    type: 'text',
    placeholder: 'All the things',
    hideLabel: false,
    maxLength: 10
  };

  beforeEach(() => {
    wrapper = shallow(
      <TextArea {...props} />
    );
  });

  it('should render an input with props', () => {
    const actual = wrapper.containsMatchingElement(
      <textarea
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        maxLength={props.maxLength}
        value={props.value}
        rows="2"
      />
    )
    expect(actual).to.eq(true);
  });

  describe('onChange', () => {
    it('should update the textarea value', () => {
      let textarea = wrapper.find('textarea');
      textarea.simulate('change', {
        target: { value: 'testing' }
      });
      textarea = wrapper.find('textarea');
      expect(textarea.prop('value')).to.eq('testing');
    });
    it('should call props.onChange', () => {
      const onChangeSpy = sinon.spy();
      wrapper.setProps({
        onChange: onChangeSpy
      });
      let textarea = wrapper.find('textarea');
      textarea.simulate('change', {
        target: { value: 'testing' }
      });
      expect(onChangeSpy).to.have.been.calledOnce;
      expect(onChangeSpy).to.have.been.calledWith('testing');
    });
  });

});
