import React from 'react'
import { Field } from 'redux-form';
import { LoginForm, textInput, required } from 'components/LoginForm/LoginForm'
import { shallow } from 'enzyme'

describe('(Component) LoginForm', () => {
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<LoginForm {...props} />);
  });

  it('should render a title', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Login</h2>
    );
    expect(actual).to.equal(true);
  });
  
  it('should render a username field', () => {
    const actual = wrapper.containsMatchingElement(
      <Field name="username"
             component={textInput}
             type="text"
             placeholder="username"
             label="Username"
             validate={required} />
    );
    expect(actual).to.equal(true);
  });

  it('should render a password field', () => {
    const actual = wrapper.containsMatchingElement(
      <Field name="password"
             component={textInput}
             type="password"
             placeholder="password"
             label="Password"
             validate={required} />
    );
    expect(actual).to.equal(true);
  });

  it('should render an error', () => {
    props = {
      error: 'Something is wrong'
    }
    const errorWrapper = shallow(
      <LoginForm {...props} />
    );
    const actual = errorWrapper.containsMatchingElement(
      <strong>{props.error}</strong>
    );
    expect(actual).to.equal(true);
  });

  describe('submit button', () => {
 
    it('should render a button', () => {
      props = {
        onSubmit: () => {},
        error: false,
        pristine: false,
        submitting: false
      }
      const buttonWrapper = shallow(<LoginForm {...props} />);
      const actual = buttonWrapper.containsMatchingElement(
        <button type="submit" disabled={false}>Submit</button>
      );
      expect(actual).to.equal(true);
    });

    it('should call onSubmit prop onClick', () => {
      props = {
        onSubmit: sinon.spy(),
        error: false,
        pristine: false,
        submitting: false
      }
      const spies = {
        buttonClick: sinon.spy()
      };

      const buttonWrapper = shallow(<LoginForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      props.onSubmit.should.have.been.called;
    });
    
  });

});
