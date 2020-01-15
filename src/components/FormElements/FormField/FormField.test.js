import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormField from './index';
import FormFieldInput from '../FormFieldInput';
import FormFieldLabel from '../FormFieldLabel';
import FieldsetLegend from '../FieldsetLegend';
import FormFieldError from '../FormFieldError';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormField', () => {
  let wrapper,
      props = {
        id: 'test',
        component: 'Test',
        type: 'text',
        label: '',
        title: 'Testing',
        placeholder: '',
        required: true,
        ctaCopy: '',
        minImageDimensions: {},
        fieldsetLegend: '',
        helpText: 'input must be in XYZ format',
        items: [],
        onChange: () => { },
        error: '',
        touched: false,
        dirty: false
      };

  beforeEach(() => {
    wrapper = shallow(<FormField {...props} />);
  });

  it('should render <FormFieldInput />', () => {
    const actual = wrapper.containsMatchingElement(
      <FormFieldInput {...props} />
    );
    expect(actual).to.eq(true);
  });

  describe('with props.fieldsetLegend', () => {
    it('should render <FieldsetLegend />', () => {
      const mockFieldsetLegend = 'oh no';
      wrapper.setProps({
        fieldsetLegend: mockFieldsetLegend
      });
      const actual = wrapper.containsMatchingElement(
        <FieldsetLegend
          id={props.id}
          legend={mockFieldsetLegend}
          required={props.required}
        />
      );
      expect(actual).to.eq(true);
    });
  });

  describe('with props.title', () => {
    it('should render <h5 />', () => {
      const actual = wrapper.containsMatchingElement(
        <h5>
          {props.title}
          <span className='required'>*</span>
        </h5>
      );
      expect(actual).to.eq(true);
    });
  });

  describe('with props.label', () => {
    it('should render <FormLabel />', () => {
      const mockLabel = 'oh no';
      wrapper.setProps({
        label: mockLabel
      });
      const actual = wrapper.containsMatchingElement(
        <FormFieldLabel
          id={props.id}
          label={mockLabel}
          required={props.required}
          helpText={props.helpText}
        />
      );
      expect(actual).to.eq(true);
    });
  });

  describe('with props.touched and props.error', () => {
    it('should render <FormFieldError />', () => {
      const mockError = 'oh no';
      wrapper.setProps({
        error: mockError,
        touched: true
      });
      const actual = wrapper.containsMatchingElement(
        <FormFieldError error={mockError} />
      );
      expect(actual).to.eq(true);
    });
  });

});
