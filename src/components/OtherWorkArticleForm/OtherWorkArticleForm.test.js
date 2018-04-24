import React from 'react';
import { expect } from 'chai';
import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import TextInput from '../TextInput/TextInput';
import Datepicker from '../Datepicker/Datepicker';
import OtherWorkArticleForm from '../OtherWorkArticleForm';
import DropzoneImageUpload from '../NewsArticleForm/DropzoneImageUpload';
import { required } from 'utils/form';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) OtherWorkArticleForm', () => {
  let wrapper,
    props;

  it('should render a `Create` heading', () => {
    props = { location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <OtherWorkArticleForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <h2>Create other-work article</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render an `Edit` heading', () => {
    props = { location: { pathname: 'test/edit' } };
    const editWrapper = shallow(
      <OtherWorkArticleForm {...props} />
    );
    const actual = editWrapper.containsMatchingElement(
      <h2>Edit other-work article</h2>
    );
    expect(actual).to.equal(true);
  });

  describe('form fields', () => {
    beforeEach(() => {
      wrapper = shallow(<OtherWorkArticleForm {...props} />);
    });
    it('should render a mainImageUrl field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='mainImageUrl'
          title='Main image'
          component={DropzoneImageUpload} />
      );
      expect(actual).to.equal(true);
    });

    it('should render a title field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='title'
          component={TextInput}
          type='text'
          placeholder='Hello World'
          label='Title'
          validate={required} />
      );
      expect(actual).to.equal(true);
    });

    it('should render a copy field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='copy'
               component={TextInput}
               validate={required} />
      );
      expect(actual).to.equal(true)
    });

    it('should render an externalLink field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='externalLink'
               component={TextInput} />
      );
      expect(actual).to.equal(true)
    });

    it('should render releaseDate field', () => {
      const props = {
        formValues: {
          releaseDate: new Date()
        }
      };
      const datepickerWrapper = shallow(<OtherWorkArticleForm {...props} />);
      const actual = datepickerWrapper.containsMatchingElement(
        <Field name='releaseDate'
          component={Datepicker}
          title='Release date'
          initTime={props.formValues.scheduledTime} />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render an error', () => {
    props = {
      error: 'Something is wrong'
    }
    const errorWrapper = shallow(
      <OtherWorkArticleForm {...props} />
    );
    const actual = errorWrapper.containsMatchingElement(
      <strong>{props.error}</strong>
    );
    expect(actual).to.equal(true);
  });

  describe('submit button', () => {
    it('should render a button', () => {
      props = {
        onSubmit: () => { },
        error: false,
        pristine: false,
        submitting: false
      }
      const buttonWrapper = shallow(<OtherWorkArticleForm {...props} />);
      const actual = buttonWrapper.containsMatchingElement(
        <button type='submit'>Submit</button>
      );
      expect(actual).to.equal(true);
    });

    it('should call onSubmitForm prop onClick', () => {
      props = {
        onSubmitForm: sinon.spy(),
        error: false,
        pristine: false,
        submitting: false,
        formValues: { mainImage: { url: 'test.com' } }
      }
      const buttonWrapper = shallow(<OtherWorkArticleForm {...props} />);
      const button = buttonWrapper.find('button[type="submit"]');
      button.simulate('click');
      props.onSubmitForm.should.have.been.called;
    });
  });
});
