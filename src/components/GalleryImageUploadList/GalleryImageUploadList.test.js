import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GalleryImageUploadList from './GalleryImageUploadList';
import FormField from '../FormElements/FormField';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GalleryImageUploadList', () => {
  let onChangeDescriptionSpy = sinon.spy();
  let wrapper,
    props = {
      images: [
        { cloudinaryUrl: 'test.com', cloudinaryPublicId: '1234' },
        { cloudinaryUrl: 'test2.com', cloudinaryPublicId: '1234' }
      ],
      onChangeDescription: onChangeDescriptionSpy,
      selectOptions: [
        { value: 'test1', label: 'Testing 1' },
        { value: 'test2', label: 'Testing 2' }
      ]
    };


  const mockOptions = [
    { value: 'testA', label: 'Test A' },
    { value: 'testB', label: 'Test B' },
  ];

  beforeEach(() => {
    wrapper = shallow(<GalleryImageUploadList {...props} />);
  });

  it('should render a list item for each image', () => {
    const listItem = wrapper.find('li');
    expect(listItem.length).to.eq(2);
  });

  it('should render a list item with image', () => {
    const actual = wrapper.containsMatchingElement(
      <img src={props.images[0].cloudinaryUrl} />
    );
    expect(actual).to.eq(true);
  });

  describe('description <FormField />', () => {
    it('should render', () => {
      const formField = wrapper.find('FormField').first();

      expect(formField.prop('id')).to.eq('description-0');
      expect(formField.prop('component')).to.eq('TextInput');
      expect(formField.prop('type')).to.eq('text');
      expect(formField.prop('placeholder')).to.eq('test....');
      expect(formField.prop('label')).to.eq('Description');
      expect(formField.prop('name')).to.eq('temp...');
      expect(formField.prop('required')).to.eq(true);
      expect(formField.prop('onChange')).to.be.a('function');
    });

    it('should call props.onChangeDescription when onChange is called', () => {
      const formField = wrapper.find('FormField').first();
      const mockValue = 'testing';
      formField.prop('onChange')(mockValue);
      expect(onChangeDescriptionSpy).to.have.been.called;
      expect(onChangeDescriptionSpy).to.have.been.calledWith(
        props.images[0].cloudinaryPublicId,
        mockValue
      );
    });
  });

  it('should render collaboratorsInImage <FormField />', () => {
    const actual = wrapper.containsMatchingElement(
      <FormField
        id='collaboratorsInImage'
        component='SelectSearch'
        type='arrayOfSomething'
        required
        label='Who is in this image?'
        options={props.selectOptions}
      />
    );
    expect(actual).to.eq(true);
  });

  it('should render remove button', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Remove</button>
    );
    expect(actual).to.eq(true);
  });

});
