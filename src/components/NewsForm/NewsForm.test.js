import React from 'react';

import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  NewsForm,
  required
} from './NewsForm';
import TextInput from '../TextInput';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) NewsForm', () => {
  let wrapper,
  props,
  baseProps = {
    handleModalClose: () => {},
    onSubmitForm: () => {},
    onAddArticleSection: () => {},
    formValues: {
      title: '',
      sections: [
        {
          images: [],
          copy: ''
        }
      ]
    }
  };

  beforeEach(() => {
    props = { ...baseProps, location: { pathname: 'test/create' } };
    wrapper = shallow(
      <NewsForm {...props} />
    );
  });

  describe('rendering', () => {

    it('should render a `Create` heading', () => {
      const actual = wrapper.containsMatchingElement(
        <h2>Create News 🗞️</h2>
      );
      expect(actual).to.equal(true);
    });

    it('should render an `Editing` heading', () => {
      props = {
        ...baseProps,
        location: { pathname: 'test/edit' },
        formValues: {
          title: 'hello world'
        }
      };
      const editWrapper = shallow(
        <NewsForm {...props} />
      );
      const actual = editWrapper.containsMatchingElement(
        <h2>{`Editing ${props.formValues.title} 🗞️`}</h2>
      );
      expect(actual).to.equal(true);
    });

    describe('form fields', () => {
      beforeEach(() => {
        wrapper = shallow(<NewsForm {...props} />);
      });

      it('should render a title/month field', () => {
        const actual = wrapper.containsMatchingElement(
          <Field
            name='title'
            component={TextInput}
            type='text'
            placeholder='January update'
            label='Month'
            validate={required}
            required
          />
        );
        expect(actual).to.equal(true);
      });
    });

    describe('submit button', () => {
      it('should render', () => {
        props = {
          ...baseProps,
          onSubmit: () => {},
          error: undefined,
          pristine: false,
          submitting: false
        }
        const buttonWrapper = shallow(<NewsForm {...props} />);
        const actual = buttonWrapper.containsMatchingElement(
          <button type='submit'>Post monthly update</button>
        );
        expect(actual).to.equal(true);
      });

      it('should call onSubmitForm prop onClick', () => {
        props = {
          ...baseProps,
          onSubmitForm: sinon.spy(),
          error: undefined,
          pristine: false,
          submitting: false,
          formValues: { mainImage: { url: 'test.com' } }
        }
        const buttonWrapper = shallow(<NewsForm {...props} />);
        const button = buttonWrapper.find('button[type="submit"]');
        button.simulate('click');
        expect(props.onSubmitForm.calledOnce).to.eq(true);
      });
    });
  });
});
