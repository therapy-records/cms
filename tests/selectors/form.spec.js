import {
  selectNewsPostForm,
  selectNewsPostFormValues
} from 'selectors/form';

const mockState = {
  form: {
    NEWS_POST_FORM: {
      values: {
        title: 'asdfasdf',
        mainBody: '<p>hello</p><p>test</p>'
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
});
