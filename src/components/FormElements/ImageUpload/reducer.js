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

      // TODO: simplify what's pushed
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
        return i;
      });

      return {
        ...state,
        images: updatedImages
      };
    }

    case 'removeImage': {
      const updatedImages = state.images.filter((i) =>
        i.cloudinaryUrl !== action.payload.cloudinaryUrl
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
