import formReducer, { initReducerState } from './reducer';

describe('(Component) Form - reducer', () => {
  const mockFields = [
    { id: 'testFieldA' },
    { id: 'testFieldB' }
  ];
  const initState = initReducerState(mockFields);

  describe('initReducerState', () => {
    it('should return the correct state shape', () => {
      const result = initReducerState(mockFields);
      expect(result).to.deep.eq({
        fields: mockFields,
        isValid: false,
        submitSuccess: false
      });
    });
  });

  describe('action - updateFieldValue', () => {
    it('should update a single field state', () => {
      const action = formReducer(
        initState,
        {
          type: 'updateFieldValue',
          payload: {
            id: mockFields[0].id,
            value: 'testing'
          }
        }
      );
      expect(action.fields).deep.eq([
        {
          id: mockFields[0].id,
          value: 'testing',
          dirty: true,
          touched: true
        },
        { ...mockFields[1] }
      ]);

    });
  });

  describe('action - isFormValid', () => {

    describe('when required fields do NOT have a value', () => {
      it('should set field.error and isValid correctly', () => {
        const mockFields = [
          { id: 'testFieldA', required: true },
          { id: 'testFieldB', required: true, value: '' },
          { id: 'testFieldC', required: true, value: 'testing', error: 'field is required' }
        ];
        const isFormValidInitState = initReducerState(mockFields);
        
        const action = formReducer(
          isFormValidInitState,
          { type: 'isFormValid' }
        );
        
        const expectedState = {
          isValid: false,
          fields: [
            {...mockFields[0], error: 'This field is required' },
            {...mockFields[1], error: 'This field is required' },
            {...mockFields[2], error: null }
          ]
        };
        expect(action).to.deep.eq(expectedState);
      });
    });

    describe('when all required fields have a value', () => {
      it('should set field.error and isValid correctly', () => {
        const mockFields = [
          { id: 'testFieldA', required: true, value: 'test' },
          { id: 'testFieldB', required: true, value: 'testing' },
          { id: 'testFieldC', required: true, value: 'testing' }
        ];
        const isFormValidInitState = initReducerState(mockFields);
        
        const action = formReducer(
          isFormValidInitState,
          { type: 'isFormValid' }
        );

        expect(action.isValid).to.eq(true);
      });
    });

  });

  describe('action - submitSuccess', () => {
    it('should set submitSuccess to true', () => {
      const action = formReducer(
        initState,
        { type: 'submitSuccess' }
      );
      expect(action).to.deep.eq({
        ...initState,
        submitSuccess: true
      });
    });
  });

  describe('action - resetForm', () => {
    it('should reset the state', () => {
      const mockFields = [
        { id: 'testFieldA' },
        {
          id: 'testFieldB',
          items: [
            { value: 'testA' },
            { value: 'testB' } 
          ]
        }
      ];
      const resetFormInitState = initReducerState(mockFields);
      
      const action = formReducer(
        resetFormInitState,
        { type: 'resetForm' }
      );
      
      const expectedState = {
        isValid: false,
        submitSuccess: false,
        fields: [
          {...mockFields[0] },
          {
            id: mockFields[1].id,
            items: [
              { value: '' },
              { value: '' }
            ]
          }
        ]
      };
      expect(action).to.deep.eq(expectedState);
    });
  });

  describe('default', () => {
    it('should return state', () => {
      const action = formReducer(
        initState,
        { type: 'test' }
      );
      expect(action).to.eq(initState);
    });
  });

});
