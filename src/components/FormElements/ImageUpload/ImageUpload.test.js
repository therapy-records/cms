import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import ImageUpload from './ImageUpload';
import {
  MOCK_CLOUDINARY_UPLOAD,
  MOCK_CLOUDINARY_UPLOAD_LOADING,
  MOCK_CLOUDINARY_UPLOAD_ERROR
} from '../../../mocks/cloudinary-upload.mock';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ImageUpload', () => {
  let wrapper;
  const props = {
    cloudinaryKey: '1234',
    cloudinarySignature: '5678',
    cloudinaryTimestamp: '12345678910',
    existingImages: [
      { cloudinaryUrl: 'test.com/image1.jpg' },
      { cloudinaryUrl: 'test.com/image2.jpg' },
      { cloudinaryUrl: 'test.com/image3.jpg' }
    ]
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

  describe('when mutation is successful', () => {
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

    it('should render minimum dimensions message', () => {
      const mockMinImageDimensions = { width: 100, height: 100 };

      wrapper = mount(
        <BrowserRouter>
          <MockedProvider mocks={mocks} addTypename={false}>
            <ImageUpload
              {...props}
              minImageDimensions={mockMinImageDimensions}
            />
          </MockedProvider>
        </BrowserRouter>
      );

      const actual = wrapper.containsMatchingElement(
        <span>Must be at least {mockMinImageDimensions.width}px by {mockMinImageDimensions.height}px</span>
      );
      expect(actual).to.eq(true);
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
          { path: 'local-image1.jpg' }
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
          { path: 'local-image1.jpg' }
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
                path: mockImagesArray[0].path,
                cloudinaryPublicId: '1234',
                cloudinaryUrl: 'cloudinary.com/1.jpg'
              }
            ];
            expect(imageUploadInput.prop('images')).to.deep.eq(expectedImages);
          });
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
        { path: 'local-image1.jpg' }
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
