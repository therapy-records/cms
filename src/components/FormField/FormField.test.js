import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormField from './index';
import FormInput from './FormInput';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormField', () => {
  let wrapper,
      props = {
        id: 'test',
        component: 'Test',
        type: 'text',
        label: '',
        title: '',
        heading: '',
        placeholder: '',
        required: false,
        ctaCopy: '',
        minImageDimensions: {},
        fieldsetLegend: '',
        items: [],
        onChange: () => { },
        error: '',
        touched: false,
        dirty: false
      };

  beforeEach(() => {
    wrapper = shallow(<FormField {...props} />);
  });

  it('should render <FormInput />', () => {
    const actual = wrapper.containsMatchingElement(
      <FormInput {...props} />
    );
    expect(actual).to.eq(true);
  });

  describe('with props.touched', () => {
    it('should render error', () => {
      const mockError = 'oh no';
      wrapper.setProps({
        error: mockError,
        touched: true
      });
      const actual = wrapper.containsMatchingElement(
        <span>{mockError}</span>
      );
      expect(actual).to.eq(true);
    });
  });

});
