
import {
  selectNewsForm,
  selectNewsFormValues,
  selectNewsFormSyncErrors,
  selectJournalismForm,
  selectJournalismFormValues,
  selectJournalismFormValuesSyncErrors
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
    JOURNALISM_FORM: {
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

  describe('selectJournalismForm', () => {
    it('should return JOURNALISM_FORM', () => {
      const actual = selectJournalismForm(mockState);
      const expected = mockState.form.NEWS_FORM;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectJournalismFormValues', () => {
    it('should return JOURNALISM_FORM values', () => {
      const actual = selectJournalismFormValues(mockState);
      const expected = mockState.form.JOURNALISM_FORM.values;
      expect(actual).to.deep.equal(expected);
    });
  });
  describe('selectJournalismFormValuesSyncErrors', () => {
    it('should return JOURNALISM_FORM syncErrors', () => {
      const actual = selectJournalismFormValuesSyncErrors(mockState);
      const expected = mockState.form.JOURNALISM_FORM.syncErrors;
      expect(actual).to.deep.equal(expected);
    });
  });

});
