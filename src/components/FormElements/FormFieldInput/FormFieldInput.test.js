import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import FormFieldInput from './FormFieldInput';
import TextArea from '../TextArea';
import Select from '../Select';
import TextInput from '../TextInput';
import TextInputsList from '../TextInputsList';
import ImageUploadContainer from '../../FormElements/ImageUpload/ImageUploadContainer';
import RichTextEditor from '../../RichTextEditor';
import Datepicker from '../../Datepicker';

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

    describe('when field.component is `TextArea`', () => {
      it('should render <TextArea />', () => {
        const mockField = {
          id: 'test',
          component: 'TextArea',
          placeholder: 'testing',
          label: 'Test',
          required: true,
          maxLength: 100
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <TextArea
            placeholder={mockField.placeholder}
            label={mockField.label}
            name={mockField.id}
            required={mockField.required}
            onChange={mockOnChange}
            maxLength={mockField.maxLength}
            value={mockField.value}
          />
        );
        expect(actual).to.eq(true);
      });
    });

    describe('when field.component is `Select`', () => {
      it('should render <Select />', () => {
        const mockField = {
          id: 'test',
          component: 'Select',
          placeholder: 'testing',
          label: 'Test',
          required: true,
          options: [
            { text: 'Category A', value: 'A' },
            { text: 'Category B', value: 'B' }
          ]
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <Select
            label={mockField.label}
            name={mockField.id}
            required={mockField.required}
            onChange={mockField.onChange}
            value={mockField.value}
            options={mockField.options}
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

      it('should render <ImageUploadContainer />', () => {
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <ImageUploadContainer
            minImageDimensions={mockField.minImageDimensions}
            ctaCopy={mockField.ctaCopy}
            // existingImages={mockField[mockField.value]}
            existingImages={[]}
            multiple={mockField.multipleImages}
            id={mockField.id}
          />
        );
        expect(actual).to.eq(true);
      });

      describe('when there is a props.value with image object', () => {
        it('should render ImageUploadContainer with existingImages array', () => {
          const mockExistingImage = {
            cloudinaryUrl: 'test1.com',
            cloudinaryPublicId: '1234'
          };

          mockField.value = mockExistingImage;

          wrapper.setProps({
            ...mockField,
            onChange: mockOnChange
          });

          const expectedExistingImages = [mockExistingImage];

          const actual = wrapper.containsMatchingElement(
            <ImageUploadContainer
              minImageDimensions={mockField.minImageDimensions}
              ctaCopy={mockField.ctaCopy}
              existingImages={expectedExistingImages}
              multiple={mockField.multipleImages}
              id={mockField.id}
            />
          );
          expect(actual).to.eq(true);
        });
      });
    });

    describe('when field.component is `Datepicker`', () => {
      it('should render <Datepicker />', () => {
        const mockField = {
          id: 'test',
          component: 'Datepicker',
          value: moment.now().toString(),
          showTime: false
        };
        wrapper.setProps({
          ...mockField,
          onChange: mockOnChange
        });

        const actual = wrapper.containsMatchingElement(
          <Datepicker
            onChange={mockOnChange}
            name={mockField.id}
            value={mockField.value}
            showSingleHiddenInputValue
            showTime={mockField.showTime}
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

      describe('when field.component/type is not recognized', () => {
        it('should return null', () => {
          const mockField = {
            component: 'testt',
            type: 'test'
          };

          wrapper.setProps({ ...mockField });

          expect(wrapper.type()).to.eq(null);
        });
      });


    });

  });

});
