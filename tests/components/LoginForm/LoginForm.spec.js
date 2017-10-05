import React from 'react'
import { Field } from 'redux-form';
import { LoginForm, textInput, required } from 'components/LoginForm/LoginForm'
import { shallow } from 'enzyme'

describe('(Component) LoginForm', () => {
  let wrapper,
      props = {
        onSubmit: () => {}
      };

  beforeEach(() => {
    wrapper = shallow(<LoginForm {...props} />);
  });

  it('should render a username field', () => {
    const actual = wrapper.containsMatchingElement(
      <Field name='username'
             component={textInput}
             type='text'
             placeholder='Username'
             validate={required} />
    );
    expect(actual).to.equal(true);
  });

  it('should render a password field', () => {
    const actual = wrapper.containsMatchingElement(
      <Field name='password'
             component={textInput}
             type='password'
             placeholder='Password'
             validate={required} />
    );
    expect(actual).to.equal(true);
  });

  it('should render an error', () => {
    props = {
      onSubmit: () => {},
      error: 'Something is wrong'
    }
    const errorWrapper = shallow(
      <LoginForm {...props} />
    );
    const actual = errorWrapper.containsMatchingElement(
      <p>{props.error}</p>
    );
    expect(actual).to.equal(true);
  });

  it('should render an authError', () => {
    props = {
      onSubmit: () => {},
      authError: 'oh no!'
    }
    const authErrorWrapper = shallow(
      <LoginForm {...props} />
    );
    const actual = authErrorWrapper.containsMatchingElement(
      <p>{props.authError}</p>
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
        <button type='submit' disabled={false}>Login</button>
      );
      expect(actual).to.equal(true);
    });

    it('should call onSubmit prop onClick', () => {
      props = {
        onSubmit: sinon.spy(),
        error: false,
        pristine: false,
        submitting: false
      };
      const buttonWrapper = shallow(<LoginForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      props.onSubmit.should.have.been.called;
    });
  });
});
