import React from 'react';
import { Field } from 'redux-form';
import {
  NewsPostForm,
  textInput,
  required,
  bodyMainRTE
} from 'components/NewsPostForm/NewsPostForm';
import Datepicker from 'components/Datepicker/Datepicker';
import ArticlePreview from 'components/ArticlePreview/ArticlePreview.container';
import DropzoneImageUpload from 'components/NewsPostForm/DropzoneImageUpload';
import { shallow } from 'enzyme'

describe('(Component) NewsPostForm', () => {
  let wrapper,
      props;

  it('should render a `Create` heading', () => {
    props = { location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <NewsPostForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <h2>Create post</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render an `Edit` heading', () => {
    props = { location: { pathname: 'test/edit' } };
    const editWrapper = shallow(
      <NewsPostForm {...props} />
    );
    const actual = editWrapper.containsMatchingElement(
      <h2>Edit post</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render <ArticlePreview />', () => {
    props = { location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <NewsPostForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <ArticlePreview />
    );
    expect(actual).to.equal(true);
  });

  it('should not render <ArticlePreview /> with disabled prop, with correct conditions', () => {
    const _location = { pathname: 'test/create' };
    props = { location: _location, invalid: true };
    const createWrapper = shallow(<NewsPostForm {...props} />);
    const actual = createWrapper.containsMatchingElement(<ArticlePreview />);
    expect(actual).to.equal(true);
    props = { location: _location, error: true };
    const createWrapperError = shallow(<NewsPostForm {...props} />);
    const actualError = createWrapperError.containsMatchingElement(<ArticlePreview />);
    expect(actualError).to.equal(true);
    props = { location: _location, pristine: true };
    const createWrapperPristine = shallow(<NewsPostForm {...props} />);
    const actualPristine = createWrapperPristine.containsMatchingElement(<ArticlePreview />);
    expect(actualPristine).to.equal(true);
  });

  describe('form fields', () => {
    beforeEach(() => {
      wrapper = shallow(<NewsPostForm {...props} />);
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
               component={textInput}
               type='text'
               placeholder='Hello World'
               label='Title'
               validate={required} />
      );
      expect(actual).to.equal(true);
    });

    it('should render a bodyMain field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='bodyMain'
               component={bodyMainRTE}
               validate={required} />
      );
      expect(actual).to.equal(true)
    });

    it('should render scheduledTime field', () => {
      const props = { formValues: { scheduledTime: new Date() } };
      const datepickerWrapper = shallow(<NewsPostForm {...props} />);
      const actual = datepickerWrapper.containsMatchingElement(
        <Field name='scheduledTime'
               component={Datepicker}
               title='Schedule Time'
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
      <NewsPostForm {...props} />
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
      const buttonWrapper = shallow(<NewsPostForm {...props} />);
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
        formValues: {}
      }
      const buttonWrapper = shallow(<NewsPostForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      props.onSubmitForm.should.have.been.called;
    });

    it('should call onSubmitFormQueue prop onClick if scheduledTime', () => {
      props = {
        onSubmitFormQueue: sinon.spy(),
        error: false,
        pristine: false,
        submitting: false,
        formValues: {
          scheduledTime: new Date()
        }
      }
      const buttonWrapper = shallow(<NewsPostForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      props.onSubmitFormQueue.should.have.been.called;
    });
  });
});
