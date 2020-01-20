export function initReducerState(initialItems) {
  return { listItems: initialItems };
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      return {
        listItems: [
          ...state.listItems,
          { value: '' }
        ]
      }
    }
    case 'edit': {
      const { index, value } = action.payload;
      const newListItems = [
        ...state.listItems
      ];
      newListItems[index].value = value

      return {
        listItems: newListItems
      };
    }
    case 'remove': {
      const newListItems = state.listItems;
      newListItems.splice(action.payload.index, 1);
      return {
        listItems: newListItems
      };
    }

    default:
      return state;
  }
}

export default reducer;
