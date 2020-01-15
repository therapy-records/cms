import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Link } from 'react-router-dom';
import FormSuccess from './';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) FormSuccess', () => {
  let wrapper;
  const props = {
    baseUrl: '/collaborators',
    copy: {
      homeLink: 'Go to Collaborators',
      createLink: 'Create another Collaborator',
    },
    onReset: () => {}
  };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <FormSuccess {...props} />
      </BrowserRouter>
    );
  });

  it('should render a <Link /> to props.baseUrl', () => {
    const actual = wrapper.containsMatchingElement(
      <Link
        to={props.baseUrl}
      >{props.copy.homeLink}
      </Link>
    );
    expect(actual).to.eq(true);
  });

  it('should render a button', () => {
    const actual = wrapper.containsMatchingElement(
      <button
        onClick={props.onReset}
      >
        {props.copy.createLink}
      </button>
    );
    expect(actual).to.eq(true);
  });

});
