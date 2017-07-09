import {
  selectNewsPostForm,
  selectNewsPostFormValues,
  selectNewsPostFormSyncErrors
} from 'selectors/form';

const mockState = {
  form: {
    NEWS_POST_FORM: {
      values: {
        title: 'asdfasdf',
        mainBody: '<p>hello</p><p>test</p>'
      },
      syncErrors: {
        someField: 'is required'
      }
    }
  }
};

describe('(Selectors) form', () => {
  describe('selectNewsPostForm', () => {
    it('should return NEWS_POST_FORM', () => {
      const actual = selectNewsPostForm(mockState);
      const expected = mockState.form.NEWS_POST_FORM;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectNewsPostFormValues', () => {
    it('should return NEWS_POST_FORM values', () => {
      const actual = selectNewsPostFormValues(mockState);
      const expected = mockState.form.NEWS_POST_FORM.values;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectNewsPostFormSyncErrors', () => {
    it('should return NEWS_POST_FORM syncErrors', () => {
      const actual = selectNewsPostFormSyncErrors(mockState);
      const expected = mockState.form.NEWS_POST_FORM.syncErrors;
      expect(actual).to.deep.equal(expected);
    });
  });
});
