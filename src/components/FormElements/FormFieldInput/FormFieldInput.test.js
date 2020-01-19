import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormFieldInput from './FormFieldInput';
import TextInput from '../TextInput';
import TextInputsList from '../TextInputsList';
import DropzoneImageUpload from '../../DropzoneImageUpload';
import RichTextEditor from '../../RichTextEditor';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormFieldInput', () => {
  let wrapper,
    props = {
      id: 'test',
      type: 'text',
      component: 'TextInput'
    };
  const mockOnChange = () => { };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<FormFieldInput {...props} />);
    });

    describe('when field.component is `TextInput`', () => {
      it('should render <TextInput />', () => {
        const mockField = {
          id: 'test',
          type: 'text',
          component: 'TextInput',
          placeholder: 'testing',
          label: 'Test',
          required: true
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <TextInput
            type={mockField.type}
            placeholder={mockField.placeholder}
            label={mockField.label}
            name={mockField.id}
            required={mockField.required}
            onChange={mockOnChange}
            value={mockField.value}
          />
        );
        expect(actual).to.eq(true);
      });
    });

    describe('when field.component is `RichTextEditor`', () => {
      it('should render <RichTextEditor />', () => {
        const mockField = {
          id: 'test',
          component: 'RichTextEditor',
          title: 'Test'
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <RichTextEditor
            name={mockField.id}
            onChange={mockOnChange}
            value={mockField.value}
            showSingleHiddenInputValue
          />
        );
        expect(actual).to.eq(true);
      });
    });

    describe('when field.component is `ImageUpload`', () => {
      it('should render <DropzoneImageUpload />', () => {
        const mockField = {
          id: 'test',
          component: 'ImageUpload',
          title: 'Test',
          minImageDimensions: {
            width: 10,
            height: 10
          },
          ctaCopy: 'Drop it like it\'s hot',
          value: ''
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <DropzoneImageUpload
            title={mockField.title}
            component={DropzoneImageUpload}
            minImageDimensions={mockField.minImageDimensions}
            inputProps={{
              name: mockField.id
            }}
            showSingleHiddenInputValue
            multiple={false}
            ctaCopy={mockField.ctaCopy}
            onChange={mockOnChange}
            existingImages={[mockField.value]}
          />
        );
        expect(actual).to.eq(true);
      });
    });

    describe('when field.component is `TextInputsList`', () => {

      it('should render <TextInputsList />', () => {
        const mockField = {
          id: 'test',
          component: 'TextInputsList',
          heading: 'Test',
          items: [
            { value: 'test', id: 'test1' },
            { value: 'test', id: 'test2' }
          ]
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <TextInputsList
            heading={mockField.heading}
            items={mockField.items}
            name={mockField.id}
            onChange={mockOnChange}
            value={mockField.value}
          />
        );
        expect(actual).to.eq(true);
      });

      describe('when field.type is `arrayOfStrings`', () => {
        it('should render <TextInputsList /> with correct props', () => {
          const mockField = {
            id: 'test',
            component: 'TextInputsList',
            type: 'arrayOfStrings',
            fieldsetLegend: 'Test',
            items: ['a', 'b', 'c']
          };

          wrapper.setProps({
            ...mockField,
            onChange: mockOnChange
          });

          const actual = wrapper.containsMatchingElement(
            <TextInputsList
              fieldsetLegend={mockField.fieldsetLegend}
              items={mockField.items}
              name={mockField.id}
              onChange={mockOnChange}
              value={mockField.value}
              showAddRemove
            />
          );
          expect(actual).to.eq(true);
        });
      });

    });

  });

});