export function initReducerState(initImages) {
  return {
    images: initImages,
    validationMessage: null
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
        cloudinaryPublicId,
        uploadedUrl,
        originalPath
      } = action.payload;
      const updatedImages = state.images;

      updatedImages.map((i) => {
        if (i.path === originalPath) {
          i.cloudinaryPublicId = cloudinaryPublicId;
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

    case 'deleteLocalImage': {
      const updatedImages = state.images.filter((i) =>
        i.path !== action.payload.path
      );

      return {
        ...state,
        images: updatedImages
      }
    }

    case 'addValidationMessage': {
      const validationMessage = action.payload;

      return {
        ...state,
        validationMessage
      }
    }

    case 'removeValidationMessage': {
      return {
        ...state,
        validationMessage: null
      }
    }

    default:
      return state;
  }
}

export default reducer;
