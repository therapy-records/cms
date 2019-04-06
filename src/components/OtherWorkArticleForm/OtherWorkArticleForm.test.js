import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import TextInput from '../TextInput/TextInput';
import Datepicker from '../Datepicker/Datepicker';
import { OtherWorkArticleForm, OTHER_WORK_ARTICLE_MIN_IMAGE_DIMENSIONS } from './OtherWorkArticleForm';
import DropzoneImageUpload from '../NewsArticleForm/DropzoneImageUpload';
import { required } from '../../utils/form';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) OtherWorkArticleForm', () => {
  let wrapper,
    props,
    baseProps = {
      onSubmitForm: () => {}
    }

  it('should render a `Create` heading', () => {
    props = { ...baseProps, location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <OtherWorkArticleForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <h2>Create Other Work</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render an `Edit` heading', () => {
    props = { ...baseProps, location: { pathname: 'test/edit' } };
    const editWrapper = shallow(
      <OtherWorkArticleForm {...props} />
    );
    const actual = editWrapper.containsMatchingElement(
      <h2>Edit Other Work</h2>
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
          component={DropzoneImageUpload}
          minImageDimensions={OTHER_WORK_ARTICLE_MIN_IMAGE_DIMENSIONS}
          required
        />
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
               validate={required}
               required
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render a copy field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='copy'
               component={TextInput}
               validate={required}
               required
        />
      );
      expect(actual).to.equal(true)
    });

    it('should render an externalLink field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='externalLink'
               component={TextInput}
               required
        />
      );
      expect(actual).to.equal(true)
    });

    it('should render releaseDate field', () => {
      const props = {
        ...baseProps,
        formValues: {
          releaseDate: new Date()
        }
      };
      const datepickerWrapper = shallow(<OtherWorkArticleForm {...props} />);
      const actual = datepickerWrapper.containsMatchingElement(
        <Field name='releaseDate'
               component={Datepicker}
               title='Release date'
               initTime={props.formValues.releaseDate}      
         />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render an error', () => {
    props = {
      ...baseProps,
      error: 'Something is wrong'
    }
    const errorWrapper = shallow(
      <OtherWorkArticleForm {...props} />
    );
    const actual = errorWrapper.containsMatchingElement(
      <p>{props.error}</p>
    );
    expect(actual).to.equal(true);
  });

  describe('submit button', () => {
    it('should render a button', () => {
      props = {
        onSubmitForm: () => { },
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
        pristine: false,
        submitting: false,
        formValues: { mainImage: { url: 'test.com' } }
      }
      const buttonWrapper = shallow(<OtherWorkArticleForm {...props} />);
      const button = buttonWrapper.find('button[type="submit"]');
      button.simulate('click');
      expect(props.onSubmitForm.calledOnce).to.eq(true);
    });
  });
});
