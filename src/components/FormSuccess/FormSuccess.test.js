import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Link } from 'react-router-dom';
import FormSuccess from './';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormSuccess', () => {
  let wrapper;
  const props = {
    title: 'Test',
    createCopy: 'Create another article',
    onReset: () => {}
  };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <FormSuccess {...props} />
      </BrowserRouter>
    );
  });

  it('should render a <Link />', () => {
    const actual = wrapper.containsMatchingElement(
      <Link
        to={`/${props.title.toLowerCase()}`}
      >Go to {props.title}
      </Link>
    );
    expect(actual).to.eq(true);
  });

  it('should render a button', () => {
    const actual = wrapper.containsMatchingElement(
      <button
        onClick={props.onReset}
      >
        {props.createCopy}
      </button>
    );
    expect(actual).to.eq(true);
  });

});
