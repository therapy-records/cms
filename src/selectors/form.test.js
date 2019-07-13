
import {
  selectNewsArticleForm,
  selectNewsArticleFormValues,
  selectNewsArticleFormSyncErrors,
  selectJournalismArticleForm,
  selectJournalismArticleFormValues,
  selectJournalismArticleFormValuesSyncErrors
} from './form';

const mockState = {
  form: {
    NEWS_ARTICLE_FORM: {
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
  describe('selectNewsArticleForm', () => {
    it('should return NEWS_ARTICLE_FORM', () => {
      const actual = selectNewsArticleForm(mockState);
      const expected = mockState.form.NEWS_ARTICLE_FORM;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectNewsArticleFormValues', () => {
    it('should return NEWS_ARTICLE_FORM values', () => {
      const actual = selectNewsArticleFormValues(mockState);
      const expected = mockState.form.NEWS_ARTICLE_FORM.values;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectNewsArticleFormSyncErrors', () => {
    it('should return NEWS_ARTICLE_FORM syncErrors', () => {
      const actual = selectNewsArticleFormSyncErrors(mockState);
      const expected = mockState.form.NEWS_ARTICLE_FORM.syncErrors;
      expect(actual).to.deep.equal(expected);
    });
  });

  describe('selectJournalismArticleForm', () => {
    it('should return JOURNALISM_ARTICLE_FORM', () => {
      const actual = selectJournalismArticleForm(mockState);
      const expected = mockState.form.NEWS_ARTICLE_FORM;
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
