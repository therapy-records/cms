export function initReducerState(initImages) {
  return {
    images: initImages
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'addImages': {
      const updatedImages = state.images;
      const newImages = action.payload;

      newImages.map((image) => {
        updatedImages.push(image);
      });

      return {
        ...state,
        images: updatedImages
      };
    }

    case 'addCloudinaryUrlToImage': {
      const {
        publicId,
        uploadedUrl,
        originalPath
      } = action.payload;
      const updatedImages = state.images;

      updatedImages.map((i) => {
        if (i.path === originalPath) {
          i.cloudinaryPublicId = publicId;
          i.cloudinaryUrl = uploadedUrl;
        }
      });

      return {
        ...state,
        images: updatedImages
      };
    }

    case 'deleteImage': {
      const updatedImages = state.images.filter((i) =>
        i.cloudinaryPublicId !== action.payload.cloudinaryPublicId
      );

      return {
        ...state,
        images: updatedImages
      }
    }

    default:
      return state;
  }
}

export default reducer;
