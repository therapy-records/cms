import { isEmptyString } from './strings';

export const arrayOfObjectsHasValues = (arr=[]) => {
  const itemsWithValues = arr.filter(i =>
    i.value && !isEmptyString(i.value)
  );
  if (itemsWithValues.length >= 1) {
    return true;
  }
  return false;
};
