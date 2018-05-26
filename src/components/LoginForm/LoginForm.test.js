import React from 'react'
import { expect } from 'chai';
import sinon from 'sinon';
import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { LoginForm, required } from './LoginForm';
import TextInput from '../../components/TextInput';
import LoadingSpinner from '../../components/LoadingSpinner';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) LoginForm', () => {
  let wrapper,
      props = {
        onSubmit: () => {}
      };

  beforeEach(() => {
    wrapper = shallow(<LoginForm {...props} />);
  });

  it('should render <LoadingSpinner />', () => {
    props.promiseLoading = true;
    wrapper = shallow(<LoginForm {...props} />);
    const actual = wrapper.containsMatchingElement(
      <LoadingSpinner
        active={props.promiseLoading}
        fullScreen
      />
    );
    expect(actual).to.equal(true);
  });

  it('should render a username field', () => {
    const actual = wrapper.containsMatchingElement(
      <Field name='username'
             component={TextInput}
             type='text'
             placeholder='Username'
             validate={required} />
    );
    expect(actual).to.equal(true);
  });

  it('should render a password field', () => {
    const actual = wrapper.containsMatchingElement(
      <Field name='password'
             component={TextInput}
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
        error: undefined,
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
        error: undefined,
        pristine: false,
        submitting: false
      };
      const buttonWrapper = shallow(<LoginForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      expect(props.onSubmit.calledOnce).to.eq(true);
    });
  });
});
