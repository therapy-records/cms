export function initReducerState(initImages) {
  return {
    images: initImages
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'addImages': {
      const updatedImages = state.images;

      // TODO: simplify what's pushed
      action.payload.map((image) => {
        updatedImages.push(image);
      });

      return {
        ...state,
        images: updatedImages
      }
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

    default:
      return state;
  }
}

export default reducer;
