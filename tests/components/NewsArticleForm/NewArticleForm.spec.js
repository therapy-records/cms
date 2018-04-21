import React from 'react';
import { Field } from 'redux-form';
import {
  NewsArticleForm,
  textInput,
  required,
  bodyMainRTE
} from 'components/NewsArticleForm/NewsArticleForm';
import Datepicker from 'components/Datepicker/Datepicker';
import ArticlePreview from 'components/ArticlePreview/ArticlePreview.container';
import DropzoneImageUpload from 'components/NewsArticleForm/DropzoneImageUpload';
import Quotes from 'components/NewsArticleForm/Quotes';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) NewsArticleForm', () => {
  let wrapper,
      props;

  it('should render a `Create` heading', () => {
    props = { location: { pathname: 'test/create' } };
    const createWrapper = shallow(
      <NewsArticleForm {...props} />
    );
    const actual = createWrapper.containsMatchingElement(
      <h2>Create news article</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render an `Edit` heading', () => {
    props = { location: { pathname: 'test/edit' } };
    const editWrapper = shallow(
      <NewsArticleForm {...props} />
    );
    const actual = editWrapper.containsMatchingElement(
      <h2>Edit news article</h2>
    );
    expect(actual).to.equal(true);
  });

  it('should render <ArticlePreview />', () => {
    props = { location: { pathname: 'test/create' } };
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
    props = { location: _location, invalid: true };
    const createWrapper = shallow(<NewsArticleForm {...props} />);
    const actual = createWrapper.containsMatchingElement(<ArticlePreview />);
    expect(actual).to.equal(true);
    props = { location: _location, error: true };
    const createWrapperError = shallow(<NewsArticleForm {...props} />);
    const actualError = createWrapperError.containsMatchingElement(<ArticlePreview />);
    expect(actualError).to.equal(true);
    props = { location: _location, pristine: true };
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
               title='Main image'
               component={DropzoneImageUpload} />
      );
      expect(actual).to.equal(true);
    });

    it('should render a mainImage.externalLink field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='mainImage.externalLink'
               type='url'
               title='Main image link'
               label='Main image link'
               placeholder='http://bbc.co.uk/fiona-ross'
               component={textInput} />
      );
      expect(actual).to.equal(true);
    });

    describe('secondaryImageUrl', () => {
      it('should render a button toggle ', () => {
        const actual = wrapper.containsMatchingElement(
          <button>Add secondary featured image</button>
        );
        expect(actual).to.equal(true);
      });
      it('should not render a secondaryImageUrl field by default ', () => {
        const actual = wrapper.containsMatchingElement(
          <Field name='secondaryImageUrl'
                 title='Secondary featured image'
                 component={DropzoneImageUpload} />
        );
        expect(actual).to.equal(false);
      });
      it('should show/hide the secondaryImageUrl field on button toggle ', () => {
        const button = wrapper.find('.secondary-img-toggle');
        button.simulate('click');
        let actual = wrapper.containsMatchingElement(
          <Field name='secondaryImageUrl'
                 title='Secondary featured image'
                 component={DropzoneImageUpload} />
        );
        expect(actual).to.equal(true);
        button.simulate('click');
        actual = wrapper.containsMatchingElement(
          <Field name='secondaryImageUrl'
                 title='Secondary featured image'
                 component={DropzoneImageUpload} />
        );
        expect(actual).to.equal(false);
      });

      it('should change button text on toggle ', () => {
        let button = wrapper.find('.secondary-img-toggle');
        expect(button.text()).to.eq('Add secondary featured image');
        button.simulate('click');
        button = wrapper.find('.secondary-img-toggle');
        expect(button.text()).to.eq('Remove secondary featured image');
        button.simulate('click');
        button = wrapper.find('.secondary-img-toggle');
        expect(button.text()).to.eq('Add secondary featured image'); // remove
      });
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

    it('should render a quotes field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='quotes'
               component={Quotes} />
      );
      expect(actual).to.equal(true)
    });

    it('should render scheduledTime field', () => {
      const props = {
        formValues: {
          scheduledTime: new Date(),
          mainImage: {
            url: 'test.com'
          }
        }
      };
      const datepickerWrapper = shallow(<NewsArticleForm {...props} />);
      const actual = datepickerWrapper.containsMatchingElement(
        <Field name='scheduledTime'
               component={Datepicker}
               initTime={props.formValues.scheduledTime}
               title='Scheduler (optional)'
               titleSub='Post live on a date of choosing'
               titleSub2='NOTE: This is an alpha version. <br />Time of posting is not exact and could be offset.' />
      );
      expect(actual).to.equal(true);
    });
  });

  it('should render an error', () => {
    props = {
      error: 'Something is wrong'
    }
    const errorWrapper = shallow(
      <NewsArticleForm {...props} />
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
      const buttonWrapper = shallow(<NewsArticleForm {...props} />);
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
      const buttonWrapper = shallow(<NewsArticleForm {...props} />);
      const button = buttonWrapper.find('button[type="submit"]');
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
          scheduledTime: new Date(),
          mainImage: { url: 'test.com' }
        }
      }
      const buttonWrapper = shallow(<NewsArticleForm {...props} />);
      const button = buttonWrapper.find('button[type="submit"]');
      button.simulate('click');
      props.onSubmitFormQueue.should.have.been.called;
    });
  });
});
