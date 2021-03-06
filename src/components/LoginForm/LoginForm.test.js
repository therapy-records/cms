import React from 'react'

import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginForm } from './LoginForm';
import TextInput from '../../components/TextInput';
import LoadingSpinner from '../../components/LoadingSpinner';
import { required } from '../../utils/form';

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
        fullScreenIgnoreSidebar
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

  describe('submit button', () => {
    it('should render a button', () => {
      props = {
        onSubmit: () => {},
        error: undefined,
        pristine: false,
        submitting: false,
        promiseLoading: false,
        invalid: false
      }
      const buttonWrapper = shallow(<LoginForm {...props} />);
      const actual = buttonWrapper.containsMatchingElement(
        <button type='submit' disabled={false}>Login</button>
      );
      expect(actual).to.eq(true);
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

    it('should be disabled when promiseLoading', () => {
      props = {
        onSubmit: sinon.spy(),
        error: undefined,
        pristine: false,
        submitting: false,
        promiseLoading: true
      };
      const buttonWrapper = shallow(<LoginForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      expect(button.prop('disabled')).to.eq(true);
    });

  });

  describe('onFormSubmit', () => {
    it('should call preventDefault()', () => {
      const prevDefaultSpy = sinon.spy();
      const mockEv = {
        preventDefault: prevDefaultSpy
      }
      wrapper.instance().onFormSubmit(mockEv);
      expect(prevDefaultSpy).to.have.been.calledOnce;
    });
  });
});
