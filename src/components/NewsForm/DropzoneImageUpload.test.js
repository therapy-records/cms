import React from 'react';

import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DropzoneImageUpload from './DropzoneImageUpload';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) DropzoneImageUpload', () => {
  let wrapper,
    props = {
      onChange: () => {},
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

  describe('methods', () => {

    describe('componentDidMount', () => {
      describe('when there is props.existingimages', () => {
        it('should set state', () => {
          const mockExistingImages = ['http://test.com/image.jpg'];
          wrapper.setProps({
            existingImages: mockExistingImages
          });
          wrapper.instance().componentDidMount();
          expect(wrapper.state().images).to.deep.eq(mockExistingImages);
        });
      });
    });

    describe('componentWillReceiveProps', () => {
      describe('when there is props.existingImages', () => {
        it('should set state', () => {
          const mockExistingImages = ['http://test.com/image.jpg'];
          wrapper.setProps({
            existingImages: mockExistingImages
          });
          expect(wrapper.state().images).to.deep.eq(mockExistingImages);
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

    describe('validMinimumImageDimensions', () => {
      let mockMinImageDimensions
      beforeEach(() => {
        mockMinImageDimensions = { width: 3, height: 3 };
        wrapper.setProps({
          minImageDimensions: mockMinImageDimensions
        });
      });

      describe('when provided width and height is greater than or equal to the minimum dimensions', () => {
        it('should return true', () => {
          let result = wrapper.instance().validMinimumImageDimensions({ width: 3, height: 3 });
          expect(result).to.eq(true);
          result = wrapper.instance().validMinimumImageDimensions({ width: 4, height: 4 });
          expect(result).to.eq(true);          
        });
      });

      describe('when provided width and height is less than the minimum dimensions', () => {
        it('should return false', () => {
          let result = wrapper.instance().validMinimumImageDimensions({ width: 2, height: 2 });
          expect(result).to.eq(false);
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

  describe('rendering', () => {
    it('should render a title', () => {
      const actual = wrapper.containsMatchingElement(
        <h5>{props.title}</h5>
      );
      expect(actual).to.equal(true);
    });

    it('should render a minImageDimensions message', () => {
      const actual = wrapper.containsMatchingElement(
        <p>Image must be at least {props.minImageDimensions.width}px by {props.minImageDimensions.height}px</p>
      );
      expect(actual).to.equal(true);
    });
  });
});
