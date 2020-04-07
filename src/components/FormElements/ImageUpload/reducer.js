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
        updatedImages.push(image.path);
      });

      return {
        images: updatedImages
      }
    }

    default:
      return state;
  }
}

export default reducer;
