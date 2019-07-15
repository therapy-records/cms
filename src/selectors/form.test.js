
import {
  selectNewsForm,
  selectNewsFormValues,
  selectNewsFormSyncErrors,
  selectJournalismArticleForm,
  selectJournalismArticleFormValues,
  selectJournalismArticleFormValuesSyncErrors
} from './form';

const mockState = {
  form: {
    NEWS_FORM: {
      values: {
        title: 'asdfasdf'
      },
      syncErrors: {
        someField: 'is required'
      }
    },
    JOURNALISM_ARTICLE_FORM: {
      values: {
        title: 'asdfasdf'
      },
      syncErrors: {
        someField: 'is required'
      }
    }
  }
};

describe('(Selectors) form', () => {
  describe('selectNewsForm', () => {
    it('should return NEWS_FORM', () => {
      const actual = selectNewsForm(mockState);
      const expected = mockState.form.NEWS_FORM;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectNewsFormValues', () => {
    it('should return NEWS_FORM values', () => {
      const actual = selectNewsFormValues(mockState);
      const expected = mockState.form.NEWS_FORM.values;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectNewsFormSyncErrors', () => {
    it('should return NEWS_FORM syncErrors', () => {
      const actual = selectNewsFormSyncErrors(mockState);
      const expected = mockState.form.NEWS_FORM.syncErrors;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectJournalismArticleForm', () => {
    it('should return JOURNALISM_ARTICLE_FORM', () => {
      const actual = selectJournalismArticleForm(mockState);
      const expected = mockState.form.NEWS_FORM;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectJournalismArticleFormValues', () => {
    it('should return JOURNALISM_ARTICLE_FORM values', () => {
      const actual = selectJournalismArticleFormValues(mockState);
      const expected = mockState.form.JOURNALISM_ARTICLE_FORM.values;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectJournalismArticleFormValuesSyncErrors', () => {
    it('should return JOURNALISM_ARTICLE_FORM syncErrors', () => {
      const actual = selectJournalismArticleFormValuesSyncErrors(mockState);
      const expected = mockState.form.JOURNALISM_ARTICLE_FORM.syncErrors;
      expect(actual).to.deep.equal(expected);
    });
  });

});
