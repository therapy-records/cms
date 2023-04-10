import { JOURNALISM_CATEGORIES, PRESS_CATEGORIES } from '../constants';

export const categories = {
  journalism: Object.values(JOURNALISM_CATEGORIES),
  press: Object.values(PRESS_CATEGORIES)
};

export const getJournalismCategoryById = (categoryId) => categories.journalism.find((category) => category.VALUE === categoryId);

export const getPressCategoryById = (categoryId) => categories.press.find((category) => category.VALUE === categoryId);
