import handleFormData, { required } from './form';

describe('(Utils) form', () => {

  describe('required', () => {

    describe('when there is a value', () => {
      it('should return undefined string', () => {
        const result = required('a');
        expect(result).to.eq(undefined);
      });
    });

    describe('when there is a value', () => {
      it('should return undefined', () => {
        const result = required('');
        expect(result).to.eq('required');
      });
    });

  });

  describe('handleFormData', () => {

    beforeEach(() => {
      const FormDataMock = fields => {
        return {
          entries: () => [
            ...fields
          ]
        }
      };

      global.FormData = jest.fn((data) => FormDataMock(data));
    });

    it('should return a postData object', () => {
      const mockFields = [
        ['fieldA', 'testValue'],
        ['fieldB', 'test']
      ];
      const result = handleFormData(mockFields);

      expect(result).to.deep.eq({
        fieldA: 'testValue',
        fieldB: 'test'
      });
    });

    describe('when formData contains child fields', () => {
      it('should return a postData object with the given child fields', () => {
        const mockFields = [
          ['fieldA.website', 'mywebsite.com'],
          ['fieldA.twitter', 'twitter.com'],
          ['fieldB', 'test'],
          ['fieldC.0', 'random string'],
          ['fieldC.1', 'random string 2'],
        ];
        const result = handleFormData(mockFields);

        expect(result).to.deep.eq({
          fieldA: {
            website: 'mywebsite.com',
            twitter: 'twitter.com',
          },
          fieldB: 'test',
          fieldC: [
            'random string',
            'random string 2'
          ]
        });
      });
    });

  });

});
