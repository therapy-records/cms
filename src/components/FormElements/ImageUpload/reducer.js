export function initReducerState(initImages) {
  return {
    images: initImages
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'addImages': {
      const updatedImages = state.images;

      action.payload.map((image) => {
        updatedImages.push(image);
      });

      return {
        ...state,
        images: updatedImages
      }
    }

    case 'addCloudinaryUrlToImage': {
      const { uploadedUrl, originalPath } = action.payload;
      const updatedImages = state.images;

      updatedImages.map((i) => {
        if (i.path === originalPath) {
          i.cloudinaryUrl = uploadedUrl;
        }
        return i;
      });

      return {
        ...state,
        images: updatedImages
      };
    }

    default:
      return state;
  }
}

export default reducer;
