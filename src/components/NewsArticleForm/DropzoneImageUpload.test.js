/*

import React from 'react'
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { DropzoneImageUpload } from '>/DropzoneImageUpload'
import Dropzone from 'react-dropzone';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

chai.use(sinonChai);

Enzyme.configure({ adapter: new Adapter() });

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

*/
