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
    ctaCopy: 'Drag/drop',
    multiple: true
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
});
