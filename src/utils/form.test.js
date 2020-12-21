import { outputJSONSync } from 'fs-extra';
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

    describe('when formData contains fields with `avatar` in the field id', () => {
      it('should return a postData object with avatar object', () => {
        const mockFields = [
          ['fieldA', 'testValue'],
          ['fieldB', 'test'],
          ['avatar.cloudinaryUrl', 'test.com/image.jpg'],
          ['avatar.cloudinaryPublicId', 'asdf'],
        ];

        const result = handleFormData(mockFields);

        expect(result).to.deep.eq({
          fieldA: 'testValue',
          fieldB: 'test',
          avatar: {
            cloudinaryUrl: 'test.com/image.jpg',
            cloudinaryPublicId: 'asdf'
          }
        });
      });
    });

    describe('when formData contains fields with `avatar` field id and value as object', () => {
      it('should return a postData object with avatar object', () => {
        const mockFields = [
          ['fieldA', 'testValue'],
          ['fieldB', 'test'],
          ['avatar', [
            {
              cloudinaryUrl: 'test.com/image.jpg',
              cloudinaryPublicId: 'asdf'
            }
          ]],
        ];

        const result = handleFormData(mockFields);

        expect(result).to.deep.eq({
          fieldA: 'testValue',
          fieldB: 'test',
          avatar: {
            cloudinaryUrl: 'test.com/image.jpg',
            cloudinaryPublicId: 'asdf'
          }
        });
      });
    });

    describe('when formData contains a field with `galleryImages` field id', () => {
      it('should return a postData object with `galleryImages` images object', () => {
        const galleryImagesField = {
          "description.0": "test A",
          "cloudinaryUrl.0": "test.com",
          "cloudinaryPublicId.0": "asdf",
          "description.1": "test B",
          "cloudinaryUrl.1": "test2.com",
          "cloudinaryPublicId.1": "acbd"
        };

        const galleryImagesFieldStringified = JSON.stringify(galleryImagesField);

        const mockFields = [
          [ 'galleryImages', galleryImagesFieldStringified ]
        ];

        const result = handleFormData(mockFields);

        expect(result).to.deep.eq({
          images: JSON.parse(galleryImagesFieldStringified)
        });
      });
    });

    describe('when formData contains multiple collaboratorsInImage fields', () => {
      it('should return a postData object with `collaboratorsInImage` fields mapped to an array', () => {
        const mockFields = [
          ['fieldA', 'testValue'],
          ['collaboratorsInImage', '1234'],
          ['collaboratorsInImage', '5678']
        ];

        const result = handleFormData(mockFields);

        expect(result).to.deep.eq({
          fieldA: 'testValue',
          collaboratorsInImage: [
            '1234',
            '5678'
          ]
        });
      });
    });
  });
});
