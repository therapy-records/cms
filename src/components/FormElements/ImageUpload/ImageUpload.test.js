import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import ImageUpload from './ImageUpload';
import FormFieldError from '../FormFieldError';
import {
  MOCK_CLOUDINARY_UPLOAD,
  MOCK_CLOUDINARY_UPLOAD_LOADING,
  MOCK_CLOUDINARY_DELETE
} from '../../../mocks/cloudinary-upload.mock';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ImageUpload', () => {
  let wrapper;
  const handleOnUploadSpy = sinon.spy();

  const props = {
    cloudinaryKey: '1234',
    cloudinarySignature: '5678',
    cloudinaryTimestamp: '12345678910',
    existingImages: [
      { cloudinaryUrl: 'test.com/image1.jpg', cloudinaryPublicId: '1100' },
      { cloudinaryUrl: 'test.com/image2.jpg', cloudinaryPublicId: '2200' },
      { cloudinaryUrl: 'test.com/image3.jpg', cloudinaryPublicId: '3300' }
    ],
    ctaCopy: 'test',
    minImageDimensions: {
      width: 10,
      height: 10
    },
    multiple: true,
    handleOnUpload: handleOnUploadSpy
  };

  let mocks = [
    MOCK_CLOUDINARY_UPLOAD
  ];

  const actions = async(wrapper, _actions) => {
    await act(async() => {
      await (new Promise(resolve => setTimeout(resolve, 0)));
      _actions();
      wrapper.update();
    });
  };

  beforeEach(() => {
    global.window.FileReader = false;
  });

  it('should render <ImageUploadInput />', () => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ImageUpload {...props} />
        </MockedProvider>
      </BrowserRouter>
    );

    const imageUploadInput = wrapper.find('ImageUploadInput');
    expect(imageUploadInput.length).to.eq(1);
    expect(imageUploadInput.prop('onDrop')).to.be.a('function');
    expect(imageUploadInput.prop('uploadImage')).to.be.a('function');
    expect(imageUploadInput.prop('images')).to.deep.eq(props.existingImages);
    expect(imageUploadInput.prop('loading')).to.eq(false);
    expect(imageUploadInput.prop('ctaCopy')).to.eq(props.ctaCopy);
    expect(imageUploadInput.prop('minImageDimensions')).to.eq(props.minImageDimensions);
    expect(imageUploadInput.prop('multiple')).to.eq(props.multiple);
  });

  it('should render <ImageUploadInputList />', () => {
    wrapper = mount(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <ImageUpload {...props} />
        </MockedProvider>
      </BrowserRouter>
    );

    const imageUploadList = wrapper.find('ImageUploadList');
    expect(imageUploadList.length).to.eq(1);
    expect(imageUploadList.prop('images')).to.eq(props.existingImages);
    expect(imageUploadList.prop('deleteImage')).to.be.a('function');
  });

  describe('when onDrop method is called', () => {
    it('should update <ImageUploadInput /> images prop', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUpload {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      let imageUploadInput = wrapper.find('ImageUploadInput');
      const mockImagesArray = [
        { path: 'local-image1.jpg', width: 200, height: 200 }
      ];

      await act(async() => {
        imageUploadInput.prop('onDrop')(mockImagesArray);
        await actions(wrapper, () => {
          wrapper.update();
          imageUploadInput = wrapper.find('ImageUploadInput');
          const expectedImages = [
            props.existingImages[0],
            props.existingImages[1],
            props.existingImages[2],
            ...mockImagesArray
          ];
          expect(imageUploadInput.prop('images')).to.deep.eq(expectedImages);
        });
      });
    });

    describe('when an image is too small', () => {
      it('should render <FormFieldError /> and NOT add image to <ImageUploadInput /> images prop', async() => {
        wrapper = mount(
          <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
              <ImageUpload {...props} />
            </MockedProvider>
          </BrowserRouter>
        );

        const imageUploadInput = wrapper.find('ImageUploadInput');
        const mockImagesArray = [
          { path: 'local-image123.jpg', width: 2, height: 2 }
        ];

        await act(async() => {
          imageUploadInput.prop('onDrop')(mockImagesArray);

          await actions(wrapper, () => {
            wrapper.update();

            const expectedValidationMessage = 'Width is too small (2px). Height is too small (2px).';
            const actual = wrapper.containsMatchingElement(
              <FormFieldError
                error={expectedValidationMessage}
              />
            );
            expect(actual).to.eq(true);

            const imageUploadInput = wrapper.find('ImageUploadInput');

            const imageUploadInputImages = imageUploadInput.prop('images');
            const newImageInArray = imageUploadInputImages.filter((i) => i.path === mockImagesArray[0].path);
            expect(newImageInArray.length).to.eq(0);
          });
        });
      });
    });

    describe('when multiple images are dropped but props.multiple is false', () => {
      it('should render <FormFieldError /> and NOT add image to <ImageUploadInput /> images prop', async () => {
        wrapper = mount(
          <BrowserRouter>
            <MockedProvider mocks={mocks} addTypename={false}>
              <ImageUpload {...props} multiple={false} existingImages={[]} />
            </MockedProvider>
          </BrowserRouter>
        );

        const imageUploadInput = wrapper.find('ImageUploadInput');
        const mockImagesArray = [
          { path: 'local-image1.jpg', width: 200, height: 200 },
          { path: 'local-image2.jpg', width: 200, height: 200 }
        ];

        await act(async () => {
          imageUploadInput.prop('onDrop')(mockImagesArray);

          await actions(wrapper, () => {
            wrapper.update();

            const expectedValidationMessage = 'Only 1 image is allowed.';
            const actual = wrapper.containsMatchingElement(
              <FormFieldError
                error={expectedValidationMessage}
              />
            );
            expect(actual).to.eq(true);

            const imageUploadInput = wrapper.find('ImageUploadInput');

            const imageUploadInputImages = imageUploadInput.prop('images');
            const newImageInArray = imageUploadInputImages.filter((i) => i.path === mockImagesArray[0].path);
            expect(newImageInArray.length).to.eq(0);
          });
        });
      });
    });
  });

  describe('when onUploadImage method is called', () => {
    it('should update <ImageUploadInput /> images prop', async() => {
      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUpload {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      let imageUploadInput = wrapper.find('ImageUploadInput');
      const mockImagesArray = [
        { path: 'local-image1.jpg', width: 200, height: 200 }
      ];

      await act(async() => {
        imageUploadInput.prop('uploadImage')(
          mockImagesArray[0].path,
          mockImagesArray[0].path
        );

        await actions(wrapper, () => {
          wrapper.update();
          imageUploadInput = wrapper.find('ImageUploadInput');
          const expectedImages = [
            props.existingImages[0],
            props.existingImages[1],
            props.existingImages[2],
            {
              ...mockImagesArray[0],
              cloudinaryPublicId: '1234',
              cloudinaryUrl: 'cloudinary.com/1.jpg'
            }
          ];
          expect(imageUploadInput.prop('images')).to.deep.eq(expectedImages);
        });
      });
    });
  });

  describe('when onUploadImage method is called and mutation is loading', () => {
    it('should update <ImageUploadInput /> loading prop', async() => {
      mocks = [ MOCK_CLOUDINARY_UPLOAD_LOADING ];

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUpload {...props} />
          </MockedProvider>
        </BrowserRouter>
      );

      let imageUploadInput = wrapper.find('ImageUploadInput');
      const mockImagesArray = [
        { path: 'local-image1.jpg', width: 200, height: 200 }
      ];

      await act(async() => {
        imageUploadInput.prop('uploadImage')(
          mockImagesArray[0].path,
          mockImagesArray[0].path
        );

        await actions(wrapper, () => {
          wrapper.update();
          imageUploadInput = wrapper.find('ImageUploadInput');
          expect(imageUploadInput.prop('loading')).to.eq(true);
        });
      });
    });
  });
});
