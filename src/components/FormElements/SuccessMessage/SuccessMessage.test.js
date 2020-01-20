import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Link } from 'react-router-dom';
import SuccessMessage from './';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) SuccessMessage', () => {
  let wrapper;
  const props = {
    baseUrl: '/collaborators',
    copy: {
      success: 'Congratulations!',
      homeLink: 'Go to Collaborators',
      createLink: 'Create another Collaborator',
    },
    onReset: () => {}
  };

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <SuccessMessage {...props} />
      </BrowserRouter>
    );
  });

  describe('success message', () => {
    it('should render from props', () => {
      const actual = wrapper.containsMatchingElement(
        <h3>{props.copy.success} <small>🚀</small></h3>
      );
      expect(actual).to.eq(true);
    });

    describe('when no success copy prop', () => { 
      it('should render default copy', () => {
        const mockCopy = {
          homeLink: props.copy.homeLink
        };

        wrapper = mount(
          <BrowserRouter>
            <SuccessMessage
              baseUrl={props.baseUrl}
              copy={mockCopy}
            />
          </BrowserRouter>
        );

        const actual = wrapper.containsMatchingElement(
          <h3>Success! <small>🚀</small></h3>
        );
        expect(actual).to.eq(true);
      });
    });

  });

  it('should render a <Link />', () => {
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
