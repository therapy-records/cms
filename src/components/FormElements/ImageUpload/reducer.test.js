import imageUploadReducer, { initReducerState } from './reducer';

describe('(Component) ImageUpload - reducer', () => {
  let mockInitImages = [
    {
      cloudinaryPublicId: '1234',
      cloudinaryUrl: 'test.com/image.jpg'
    }
  ];

  describe('initReducerState', () => {
    it('should return the correct state shape', () => {
      const result = initReducerState(mockInitImages);
      expect(result).to.deep.eq({
        images: mockInitImages
      });
    });
  });

  describe('action - addImages', () => {
    it('should update state with given images', () => {
      const mockImages = [
        { path: '/test1.jpg' },
        { path: '/test2.jpg' }
      ];

      const expectedImages = [
        ...mockInitImages,
        ...mockImages
      ];

      const initState = initReducerState(mockInitImages);

      const action = imageUploadReducer(
        initState,
        {
          type: 'addImages',
          payload: mockImages
        }
      );

      expect(action.images).deep.eq(expectedImages);
    });
  });

  describe('action - addCloudinaryUrlToImage', () => {
    it('should update state with cloudinary properties from image object in payload', () => {
      mockInitImages = [
        {
          cloudinaryPublicId: '0',
          path: 'test.com/image.jpg'
        },
        {
          cloudinaryPublicId: '1',
          path: '/mock1.jpg'
        }
      ];

      const mockImage = {
        originalPath: '/mock1.jpg',
        publicId: '1',
        uploadedUrl: 'test.com/1.jpg'
      };

      const expectedImages = [
        mockInitImages[0],
        {
          path: '/mock1.jpg',
          cloudinaryPublicId: '1',
          cloudinaryUrl: 'test.com/1.jpg'
        }
      ];

      const initState = initReducerState(mockInitImages);

      const action = imageUploadReducer(
        initState,
        {
          type: 'addCloudinaryUrlToImage',
          payload: mockImage
        }
      );

      expect(action.images).deep.eq(expectedImages);
    });

    describe('when originalPath in image object payload does not match a path in state', () => {
      it('should NOT update state', () => {
        mockInitImages = [
          {
            cloudinaryPublicId: '0',
            path: 'test.com/image.jpg'
          },
          {
            cloudinaryPublicId: '1',
            path: '/mock1.jpg'
          }
        ];

        const mockImage = {
          originalPath: '/test.jpg',
          publicId: '1',
          uploadedUrl: 'test.com/1.jpg'
        };

        const initState = initReducerState(mockInitImages);

        const action = imageUploadReducer(
          initState,
          {
            type: 'addCloudinaryUrlToImage',
            payload: mockImage
          }
        );

        expect(action.images).deep.eq(mockInitImages);
      });
    });
  });

  describe('action - deleteImage', () => {
    it('should remove an image from state', () => {
      const mockInitImages = [
        { cloudinaryPublicId: 'asdf1' },
        { cloudinaryPublicId: 'asdf2' }
      ];

      const initState = initReducerState(mockInitImages);

      const action = imageUploadReducer(
        initState,
        {
          type: 'deleteImage',
          payload: {
            cloudinaryPublicId: mockInitImages[0].cloudinaryPublicId
          }
        }
      );

      const expectedImages = [
        mockInitImages[1]
      ];

      expect(action.images).deep.eq(expectedImages);
    });
  });

  describe('default', () => {
    it('should return state', () => {
      const initState = initReducerState(mockInitImages);

      const action = imageUploadReducer(
        initState,
        { type: 'test' }
      );
      expect(action).to.eq(initState);
    });
  });
});
