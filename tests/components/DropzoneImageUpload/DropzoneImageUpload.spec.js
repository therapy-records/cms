import React from 'react'
import DropzoneImageUpload from 'components/DropzoneImageUpload/DropzoneImageUpload'
import Dropzone from 'react-dropzone';
import { shallow } from 'enzyme'

describe('(Component) DropzoneImageUpload', () => {
  let wrapper,
      props = {
        title: 'my title',
        input: {
          name: 'something'
        },
        multiple: false
      }

  beforeEach(() => {
    wrapper = shallow(<DropzoneImageUpload {...props} />)
  });

  it('should render <Dropzone /> with correct props', () => {
    const actual = wrapper.containsMatchingElement(
      <Dropzone name={props.input.name} multiple={props.multiple} />
    );
    expect(actual).to.equal(true);
  });
});
