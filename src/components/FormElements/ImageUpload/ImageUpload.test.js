import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageUpload from './ImageUpload';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ImageUpload', () => {
  let wrapper;
  const props = {
    minImageDimensions: {
      width: 400,
      height: 400
    },
    multiple: true,
    existingImages: [
      { cloudinaryUrl: 'test.com/image1.jpg' },
      { cloudinaryUrl: 'test.com/image2.jpg' },
      { cloudinaryUrl: 'test.com/image3.jpg' }
    ]
  };

  beforeEach(() => {
    wrapper = shallow(
      <ImageUpload {...props} />
    );
  });

  it('should render file input from Dropzone package', () => {
    const input = wrapper.find('input');
    expect(input.prop('accept')).to.eq('image/*');
    expect(input.prop('multiple')).to.eq(props.multiple);
    expect(input.prop('type')).to.eq('file');
    expect(input.prop('autoComplete')).to.eq('off');
  });

  it('should render default CTA copy', () => {
    const actual = wrapper.containsMatchingElement(
      <span>Drag &amp; drop images</span>
    );
    expect(actual).to.eq(true);
  });

  it('should render CTA copy from props', () => {
    const mockCtaCopy = 'Drag/drop';
    wrapper.setProps({
      ctaCopy: mockCtaCopy
    });

    const actual = wrapper.containsMatchingElement(
      <span>{mockCtaCopy}</span>
    );
    expect(actual).to.eq(true);
  });

  it('should render <ImageUploadList />', () => {
    const imageUploadList = wrapper.find('ImageUploadList');
    expect(imageUploadList.length).to.eq(1);
    expect(imageUploadList.prop('images')).to.eq(props.existingImages);
    expect(imageUploadList.prop('onRemove')).to.be.a('function');
  });
});
