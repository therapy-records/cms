import {
  categories,
  getJournalismCategoryById,
  getPressCategoryById
} from '.';
import { JOURNALISM_CATEGORIES, PRESS_CATEGORIES } from '../constants';

describe('helpers', () => {
  describe('categories', () => {
    it('should return an object', () => {
      const expected = {
        journalism: Object.values(JOURNALISM_CATEGORIES),
        press: Object.values(PRESS_CATEGORIES)
      };

      expect(categories).to.deep.eq(expected);
    });
  });

  describe('getJournalismCategoryById', () => {
    it('should return a journalism category', () => {
      const result = getJournalismCategoryById(2);

      const expected = categories.journalism[1];

      expect(result).to.eq(expected);
    });
  });

  describe('getPressCategoryById', () => {
    it('should return a press category', () => {
      const result = getPressCategoryById(2);

      const expected = categories.press[1];

      expect(result).to.eq(expected);
    });
  });
});
