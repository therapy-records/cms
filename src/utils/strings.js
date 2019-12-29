export const containsNumber = str => {
  return /\d/.test(str);
};

export const isAString = str => typeof str === 'string';

export const isEmptyString = str => str === "";
