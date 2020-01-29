export function initReducerState(initialItems) {
  return { items: initialItems };
}

function reducer(state, action) {
  switch (action.type) {
    case 'setListItems': {
      return {
        items: action.payload
      }
    }

    default:
      return state;
  }
}

export default reducer;
