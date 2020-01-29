import collaboratorsListReducer, { initReducerState } from './reducer';

describe('(Component) CollaboratorsList - reducer', () => {
  const mockListItems = [
    { name: 'a' },
    { name: 'b' }
  ];
  const initState = initReducerState(mockListItems);

  describe('initReducerState', () => {
    it('should return the correct state shape', () => {
      const result = initReducerState(mockListItems);
      expect(result).to.deep.eq({
        items: mockListItems
      });
    });
  });

  describe('action - setListItems', () => {
    it('should change state with the payload', () => {
      const newListItems = [
        { name: 'test' },
        { name: 'testing' },
      ];

      const action = collaboratorsListReducer(
        initState,
        {
          type: 'setListItems',
          payload: newListItems
        }
      );
      expect(action.items).deep.eq(newListItems);
    });
  });

  describe('default', () => {
    it('should return state', () => {
      const action = collaboratorsListReducer(
        initState,
        { type: 'test' }
      );
      expect(action).to.eq(initState);
    });
  });


});
