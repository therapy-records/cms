import React from 'react'
import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { browserHistory } from 'react-router';
import ErrorComponent from './Error'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ErrorComponent', () => {
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<ErrorComponent {...props} />)
  });

  it('should render error copy', () => {
    const actual = wrapper.containsAllMatchingElements([
      <h3>Oh no :(</h3>,
      <p>Sorry, we couldn't find that page.</p>
    ]);
    expect(actual).to.equal(true);
  });

  it('should render a link to home', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Go home</button>
    );
    expect(actual).to.equal(true);
  });

  it('should call redirectToHome on button click', () => {
    const button = wrapper.find('button');
    const redirectToHomeSpy = sinon.spy();
    wrapper.instance().redirectToHome = redirectToHomeSpy;
    button.simulate('click');
    expect(redirectToHomeSpy.calledOnce).to.eq(true);
  });

});
