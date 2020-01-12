import { isEmptyString } from './strings';

export const isAnObject = obj =>
  typeof obj === 'object' &&
  obj !== null &&
  !Array.isArray(obj);

export const objectHasValues = obj => {
  const properties = Object.keys(obj);
  const propertiesWithValues = properties.filter(p => {
    const value = obj[p];
    return (!isEmptyString(value) && value !== null);
  });

  if (propertiesWithValues.length >= 1) {
    return true;
  }
  return false;
}
