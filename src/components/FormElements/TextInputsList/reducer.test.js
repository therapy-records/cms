import textInputsListReducer, { initReducerState } from './reducer';

describe('(Component) TextInputsList - reducer', () => {
  const mockListItems = [
    { value: 'a' },
    { value: 'b' }
  ];
  const initState = initReducerState(mockListItems);

  describe('initReducerState', () => {
    it('should return the correct state shape', () => {
      const result = initReducerState(mockListItems);
      expect(result).to.deep.eq({
        listItems: mockListItems
      });
    });
  });

  describe('action - add', () => {
    it('should add an empty single listItem', () => {
      const action = textInputsListReducer(
        initState,
        { type: 'add' }
      );
      expect(action.listItems).deep.eq([
        ...mockListItems,
        { value: '' }
      ]);
    });
  });

  describe('action - edit', () => {
    it('should edit a single listItem', () => {
      const mockNewValue = 'test value';

      const action = textInputsListReducer(
        initState,
        {
          type: 'edit',
          payload: {
            index: 1,
            value: mockNewValue
          }
        }
      );
      expect(action.listItems).deep.eq([
        mockListItems[0],
        { value: mockNewValue }
      ]);
    });
  });

  describe('action - remove', () => {
    it('should remove a single listItem', () => {

      const action = textInputsListReducer(
        initState,
        {
          type: 'remove',
          payload: { index: 1 }
        }
      );

      expect(action.listItems).deep.eq([
        mockListItems[0]
      ]);
    });
  });

  describe('default', () => {
    it('should return state', () => {
      const action = textInputsListReducer(
        initState,
        { type: 'test' }
      );
      expect(action).to.eq(initState);
    });
  });

});
