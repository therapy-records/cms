import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'
import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import TextInput from '../TextInput/TextInput';
import Datepicker from '../Datepicker/Datepicker';
import ConnectedJournalismForm, { JournalismForm, JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS } from './JournalismForm';
import ImageUploadContainer from '../../components/FormElements/ImageUpload/ImageUploadContainer';
import { required } from '../../utils/form';
import { selectJournalismFormValues } from '../../selectors/form';
import { selectUiStateLoading } from '../../selectors/uiState';
import { JOUNALISM_FIELD_COPY_MAX_LENGTH } from '../../constants';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) JournalismForm', () => {
  let wrapper,
    props,
    baseProps = {
      onSubmitForm: () => {},
      updateImage: () => {},
      formValues: {
        title: 'test',
        image: {
          cloudinaryUrl: 'test.com',
          cloudinaryPublicId: '1234'
        }
      },
      articleId: '1234',
      promiseLoading: false,
      onDeleteEntity: () => {}
    };
    props = baseProps;

  describe('when there are no props.formValues', () => {
    it('should return null', () => {
      const wrapper = shallow(
        <JournalismForm
          {...props}
          formValues={undefined}
        />
      );
      expect(wrapper.type()).to.eq(null);
    });
  });

  describe('<PageHeader />', () => {
    beforeEach(() => {
      wrapper = shallow(
        <JournalismForm
          {...props}
        />
      );
    });

    it('should render', () => {
      const pageHeader = wrapper.find('PageHeader');
      expect(pageHeader.length).to.eq(1);
      expect(pageHeader.prop('entityName')).to.eq('journalism');
      expect(pageHeader.prop('entity')).to.eq(props.formValues);
      expect(pageHeader.prop('onDeleteEntity')).to.be.a('function');
      expect(pageHeader.prop('heading')).to.eq('Create Journalism ✍️');
      expect(pageHeader.prop('promiseLoading')).to.eq(props.promiseLoading);
      expect(pageHeader.prop('renderDeleteButton')).to.eq(false);
    });

    describe('when it\'s an `edit` form', () => {
      beforeEach(() => {
        wrapper.setProps({
          location: {
            pathname: 'test/edit'
          }
        })
      });

      it('should render correct props', () => {
        const pageHeader = wrapper.find('PageHeader');
        expect(pageHeader.prop('onDeleteEntity')).to.be.a('function');
        expect(pageHeader.prop('heading')).to.eq(`Editing ${baseProps.formValues.title} ✍️`);
        expect(pageHeader.prop('renderDeleteButton')).to.eq(true);
      });

      describe('onDeleteEntity prop', () => {
        it('should call props.onDeleteEntity with article id', () => {
          const onDeleteEntitySpy = sinon.spy();
          wrapper.setProps({
            onDeleteEntity: onDeleteEntitySpy
          });
          const pageHeader = wrapper.find('PageHeader');
          pageHeader.props().onDeleteEntity();
          expect(onDeleteEntitySpy).to.have.been.calledWith(props.articleId)
        });
      });

      it('should render submit button copy', () => {
        wrapper.setProps({
          ...baseProps,
          location: {
            pathname: 'test/edit'
          },
          onSubmit: () => { },
          error: undefined,
          pristine: false,
          submitting: false
        });
        const actual = wrapper.containsMatchingElement(
          <button type='submit'>Update article</button>
        );
        expect(actual).to.equal(true);
      });

    });
  });

  describe('form fields', () => {
    beforeEach(() => {
      wrapper = shallow(<JournalismForm {...props} />);
    });

    it('should render an image field', () => {
      const imageField = wrapper.find({ name: 'image' });
      expect(imageField.length).to.eq(1);
      expect(imageField.prop('name')).to.eq('image');
      expect(imageField.prop('component')).to.eq(ImageUploadContainer);
      expect(imageField.prop('title')).to.eq('Article screenshot');
      expect(imageField.prop('existingImages')).to.deep.equal([props.formValues.image]);
      expect(imageField.prop('minImageDimensions')).to.eq(JOURNALISM_ARTICLE_MIN_IMAGE_DIMENSIONS);
      expect(imageField.prop('handleOnUpload')).to.be.a('function');
      expect(imageField.prop('handleOnRemove')).to.be.a('function');

      expect(imageField.prop('required')).to.eq(true);
      expect(imageField.prop('validate')).to.eq(required);
    });

    it('should render a title field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name='title'
               component={TextInput}
               type='text'
               placeholder='The Essence of Michel Camilo'
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
               type='text'
               placeholder='Jazz In Europe Magazine'
               label='Short excerpt'
               maxLength={JOUNALISM_FIELD_COPY_MAX_LENGTH}
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
      const datepickerWrapper = shallow(<JournalismForm {...props} />);
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
      <JournalismForm {...props} />
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
        onSubmitForm: () => { },
        pristine: false,
        submitting: false
      }
      const buttonWrapper = shallow(<JournalismForm {...props} />);
      const actual = buttonWrapper.containsMatchingElement(
        <button type='submit'>Post article</button>
      );
      expect(actual).to.equal(true);
    });

    it('should call onSubmitForm prop onClick', () => {
      props = {
        ...baseProps,
        onSubmitForm: sinon.spy(),
        pristine: false,
        submitting: false,
        formValues: { mainImage: { url: 'test.com' } }
      }
      const buttonWrapper = shallow(<JournalismForm {...props} />);
      const button = buttonWrapper.find('button[type="submit"]');
      button.simulate('click');
      expect(props.onSubmitForm.calledOnce).to.eq(true);
    });
  });

  describe('ConnectedJournalismForm', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      form: {
        'JOURNALISM_FORM': {
          values: {}
        }
      },
      uiState: {
        promiseLoading: false
      }
    };
    let renderedProps;
    let store = {};

    beforeEach(() => {
      store = mockStore(mockStoreState);
      wrapper = shallow(
        <ConnectedJournalismForm
          store={store}
          location={mockStoreState.location}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.formValues).to.eq(selectJournalismFormValues(mockStoreState));
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
    });
  });

});
