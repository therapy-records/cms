import React from 'react';

import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DropzoneImageUpload from './DropzoneImageUpload';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) DropzoneImageUpload', () => {
  let wrapper,
    props = {
      input: {
        onChange: () => {}
      },
      title: 'hello test',
      minImageDimensions: {
        width: 400,
        height: 400
      }
    };

  beforeEach(() => {
    wrapper = shallow(
      <DropzoneImageUpload {...props} />
    );
  });

  it('should render a title', () => {
    const actual = wrapper.containsMatchingElement(
      <h5>{props.title}</h5>
    );
    expect(actual).to.equal(true);
  });

  it('should render a minImageDimensions message', () => {
    const actual = wrapper.containsMatchingElement(
      <p>Image must be at least {props.minImageDimensions.width}px x {props.minImageDimensions.height}px</p>
    );
    expect(actual).to.equal(true);
  });

  describe('methods', () => {
    describe('componentWillReceiveProps', () => {
      const mockFile1 = 'testing/test.jpg';
      const mockFile2 = 'testing/test2.jpg';

      describe('when there is props.existingImage', () => {
        it('should set singleItem state', () => {
          wrapper.setProps({
            existingImage: mockFile1
          });
          expect(wrapper.state().singleItem).to.eq(mockFile1);
        });
      });

      describe('when there is props.existingMiniGalleryImages', () => {
        it('should set items state', () => {
          wrapper.setProps({
            existingMiniGalleryImages: [
              mockFile1,
              mockFile2
            ]
          });
          expect(wrapper.state().items).to.deep.eq([
            mockFile1,
            mockFile2
          ]);
        });
      });
    });

    describe('handleImageResponseUrl', () => {
      it('should replace a given URL with cloudinary upload params', () => {
        const mockUrl = 'upload';
        const result = wrapper.instance().handleImageResponseUrl(mockUrl);
        expect(result).to.eq(mockUrl.replace(/upload/, 'upload/c_limit,q_100,w_650'))
      });
    });
  });

  describe('handleOnDrop', () => {
    it('should call uploadSingleImage for each file item', () => {
      const mockFiles = [
        'temp/testing1.jpg',
        'temp/testing2.jpg',
        'temp/testing3.jpg'
      ];
      const uploadSingleImageSpy = sinon.spy();
      wrapper.instance().uploadSingleImage = uploadSingleImageSpy;
      wrapper.instance().handleOnDrop(mockFiles);
      expect(uploadSingleImageSpy).to.have.been.calledWith(mockFiles[0]);
      expect(uploadSingleImageSpy).to.have.been.calledWith(mockFiles[1]);
      expect(uploadSingleImageSpy).to.have.been.calledWith(mockFiles[2]);
    });
  });
});
