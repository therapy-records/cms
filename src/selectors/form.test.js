
import {
  selectNewsArticleForm,
  selectNewsArticleFormValues,
  selectNewsArticleFormSyncErrors,
  selectOtherWorkArticleForm,
  selectOtherWorkArticleFormValues,
  selectOtherWorkArticleFormValuesSyncErrors
} from './form';

const mockState = {
  form: {
    NEWS_ARTICLE_FORM: {
      values: {
        title: 'asdfasdf',
        mainBody: '<p>hello</p><p>test</p>'
      },
      syncErrors: {
        someField: 'is required'
      }
    },
    OTHER_WORK_ARTICLE_FORM: {
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

  describe('selectOtherWorkArticleForm', () => {
    it('should return OTHER_WORK_ARTICLE_FORM', () => {
      const actual = selectOtherWorkArticleForm(mockState);
      const expected = mockState.form.NEWS_ARTICLE_FORM;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectOtherWorkArticleFormValues', () => {
    it('should return OTHER_WORK_ARTICLE_FORM values', () => {
      const actual = selectOtherWorkArticleFormValues(mockState);
      const expected = mockState.form.OTHER_WORK_ARTICLE_FORM.values;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectOtherWorkArticleFormValuesSyncErrors', () => {
    it('should return OTHER_WORK_ARTICLE_FORM syncErrors', () => {
      const actual = selectOtherWorkArticleFormValuesSyncErrors(mockState);
      const expected = mockState.form.OTHER_WORK_ARTICLE_FORM.syncErrors;
      expect(actual).to.deep.equal(expected);
    });
  });

});
