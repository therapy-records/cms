import React from 'react';

import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  NewsArticleForm,
  required,
  NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS
} from './NewsArticleForm';
import TextInput from '../TextInput';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import DropzoneImageUpload from './DropzoneImageUpload';
import Quotes from './Quotes';
import RichTextEditor from '../RichTextEditor';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) NewsArticleForm', () => {
  let wrapper,
    props,
    baseProps = {
      handleModalClose: () => {},
      onSubmitForm: () => {}
    }

  it('should render a `Create` heading', () => {
    props = { ...baseProps, location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <NewsArticleForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <h2>Create News</h2>
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
      <NewsArticleForm {...props} />
    );
    const actual = editWrapper.containsMatchingElement(
      <h2>{`Editing ${props.formValues.title}`}</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render <ArticlePreview />', () => {
    props = { ...baseProps, location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <NewsArticleForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <ArticlePreview />
    );
    expect(actual).to.equal(true);
  });

  it('should not render <ArticlePreview /> with disabled prop, with correct conditions', () => {
    const _location = { pathname: 'test/create' };
    props = { ...baseProps, location: _location, invalid: true };
    const createWrapper = shallow(<NewsArticleForm {...props} />);
    const actual = createWrapper.containsMatchingElement(<ArticlePreview />);
    expect(actual).to.equal(true);
    props = { ...baseProps, location: _location, error: 'an error' };
    const createWrapperError = shallow(<NewsArticleForm {...props} />);
    const actualError = createWrapperError.containsMatchingElement(<ArticlePreview />);
    expect(actualError).to.equal(true);
    props = { ...baseProps, location: _location, pristine: true };
    const createWrapperPristine = shallow(<NewsArticleForm {...props} />);
    const actualPristine = createWrapperPristine.containsMatchingElement(<ArticlePreview />);
    expect(actualPristine).to.equal(true);
  });

  describe('form fields', () => {
    beforeEach(() => {
      wrapper = shallow(<NewsArticleForm {...props} />);
    });
    it('should render a mainImage.url field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='mainImage.url'
          component={DropzoneImageUpload}
          minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
        />
      );
      expect(actual).to.equal(true);
    });

    it('should render a month field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='month'
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

    it('should render a bodyMain field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='bodyMain'
          component={RichTextEditor}
          validate={required}
          required
        />
      );
      expect(actual).to.equal(true)
    });

    it('should render a quotes field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='quotes'
          component={Quotes} />
      );
      expect(actual).to.equal(true)
    });
  });

  it('should render an error', () => {
    props = {
      ...baseProps,
      error: 'Something is wrong'
    }
    const errorWrapper = shallow(
      <NewsArticleForm {...props} />
    );
    const actual = errorWrapper.containsMatchingElement(
      <p>{props.error}</p>
    );
    expect(actual).to.equal(true);
  });

  describe('submit button', () => {
    it('should render a button', () => {
      props = {
        ...baseProps,
        onSubmit: () => {},
        error: undefined,
        pristine: false,
        submitting: false
      }
      const buttonWrapper = shallow(<NewsArticleForm {...props} />);
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
      const buttonWrapper = shallow(<NewsArticleForm {...props} />);
      const button = buttonWrapper.find('button[type="submit"]');
      button.simulate('click');
      expect(props.onSubmitForm.calledOnce).to.eq(true);
    });
  });
});
