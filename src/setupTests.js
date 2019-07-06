/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const localStorageMock = () => {
  const store = {};
  return {
    getItem: (key) => {
      return store[key] || undefined
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: jest.fn(),
    clear: jest.fn()
  }
};

global.localStorage = localStorageMock();
global.chai = chai;
global.expect = expect;
global.sinon = sinon;
global.sinonChai = sinonChai;

/* eslint-enable no-undef */
