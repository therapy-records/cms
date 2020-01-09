import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Link } from 'react-router-dom';
import FormSuccess from './FormSuccess';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormSuccess', () => {
  let wrapper;
  const props = {
    formRoute: 'Test'
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
        to={`/${props.formRoute.toLowerCase()}`}
      >Go to {props.formRoute}
      </Link>
    );
    expect(actual).to.eq(true);
  });

  it('should render a button', () => {
    const actual = wrapper.containsMatchingElement(
      <button>
        Create another
      </button>
    );
    expect(actual).to.eq(true);
  });

});
