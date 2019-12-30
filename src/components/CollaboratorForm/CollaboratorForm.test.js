import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CollaboratorForm, { AVATAR_MINIMUM_DIMENSIONS } from './index';
import { CREATE_COLLABORATOR } from '../../mutations';
import TextInput from '../FormElements/TextInput';
import TextInputsList from '../FormElements/TextInputsList';
import DropzoneImageUpload from '../DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';
import COLLABORATOR_FIELDS from './fields';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) CollaboratorForm', () => {
  let wrapper,
      props = {
        isEditForm: true
      };

  describe('rendering', () => {

    beforeEach(() => {
      wrapper = shallow(<CollaboratorForm {...props} />);
    });

    it('should render <Form /> with correct props', () => {
      const form = wrapper.find('Form');
      expect(form.length).to.eq(1);
      expect(form.prop('mutation')).to.eq(CREATE_COLLABORATOR);
      expect(form.prop('isEditForm')).to.eq(props.isEditForm);
    });

    it('should render a name field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInput
          type='text'
          placeholder='Phil Collins'
          label='Name'
          name='name'
          required
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render a role field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInput
            type='text'
            placeholder='e.g Saxophonist'
            label='Role'
            name='role'
            required
          />
      );
      expect(actual).to.equal(true);
    });

    it('should render an about field', () => {
      const actual = wrapper.containsMatchingElement(
        <RichTextEditor
          title='About'
          name='about'
          showSingleHiddenInputValue
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render an avatar field', () => {
      const actual = wrapper.containsMatchingElement(
        <DropzoneImageUpload
            title="Avatar"
            component={DropzoneImageUpload}
            minImageDimensions={AVATAR_MINIMUM_DIMENSIONS}
            inputProps={{
              name: 'avatarUrl'
            }}
            showSingleHiddenInputValue
            multiple={false}
            ctaCopy='Drag & drop image'
          />
      );
      expect(actual).to.eq(true);
    });

    it('should render a collabOn field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInputsList
          fieldsetLegend="Collaborated on"
          items={COLLABORATOR_FIELDS.collabOn}
          name='collabOn'
          showAddRemove
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render a urls field', () => {
      const actual = wrapper.containsMatchingElement(
        <TextInputsList
          heading="URLs"
          items={COLLABORATOR_FIELDS.urls}
          name='urls'
        />
      );
      expect(actual).to.equal(true);
    });

  });

});
