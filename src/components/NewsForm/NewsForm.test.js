import React from 'react';
import { Field } from 'redux-form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import ConnectedNewsForm, {
  NewsForm,
  required
} from './NewsForm';
import TextInput from '../TextInput';
import { selectNewsFormValues } from '../../selectors/form';
import { selectUiStateLoading } from '../../selectors/uiState';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) NewsForm', () => {
  let wrapper,
  props,
  baseProps = {
    articleId: '1234',
    handleModalClose: () => {},
    onSubmitForm: () => {},
    onAddArticleSection: () => {},
    onDeleteEntity: () => {},
    promiseLoading: false,
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

    describe('when there are no props.formValues', () => {
      it('should return null', () => {
        wrapper.setProps({
          formValues: undefined
        });
        expect(wrapper.type()).to.eq(null);
      });
    });

    describe('<EntityPageHeader />', () => {
      it('should render', () => {
        const entityPageHeader = wrapper.find('EntityPageHeader');
        expect(entityPageHeader.length).to.eq(1);
        expect(entityPageHeader.prop('entityName')).to.eq('news');
        expect(entityPageHeader.prop('entity')).to.eq(props.formValues);
        expect(entityPageHeader.prop('onDeleteEntity')).to.eq(null);
        expect(entityPageHeader.prop('heading')).to.eq('Create News 🗞️');
        expect(entityPageHeader.prop('promiseLoading')).to.eq(props.promiseLoading);
        expect(entityPageHeader.prop('showDeleteButton')).to.eq(false);
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
          const entityPageHeader = wrapper.find('EntityPageHeader');
          expect(entityPageHeader.prop('onDeleteEntity')).to.be.a('function');
          expect(entityPageHeader.prop('heading')).to.eq(`Editing ${props.formValues.title} 🗞️`);
          expect(entityPageHeader.prop('showDeleteButton')).to.eq(true);
        });

        describe('onDeleteEntity prop', () => {
          it('should call props.onDeleteEntity with article id', () => {
            const onDeleteEntitySpy = sinon.spy();
            wrapper.setProps({
              onDeleteEntity: onDeleteEntitySpy
            });
            const entityPageHeader = wrapper.find('EntityPageHeader');
            entityPageHeader.props().onDeleteEntity();
            expect(onDeleteEntitySpy).to.have.been.calledWith(props.articleId)
          });
        });

        it('should render submit button copy', () => {
          props = {
            ...baseProps,
            location: {
              pathname: 'test/edit'
            },
            onSubmit: () => {},
            error: undefined,
            pristine: false,
            submitting: false
          };
          wrapper = shallow(<NewsForm {...props} />);
          const actual = wrapper.containsMatchingElement(
            <button type='submit'>Update article</button>
          );
          expect(actual).to.equal(true);
        });
      });
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
            placeholder='January 2019 update'
            label='Title'
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
        wrapper = shallow(<NewsForm {...props} />);
        const actual = wrapper.containsMatchingElement(
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
        wrapper = shallow(<NewsForm {...props} />);
        const button = wrapper.find('button[type="submit"]');
        button.simulate('click');
        expect(props.onSubmitForm.calledOnce).to.eq(true);
      });
    });
  });

  describe('ConnectedJournalismForm', () => {
    const mockStore = configureMockStore();
    const mockStoreState = {
      form: {
        'NEWS_FORM': {
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
        <ConnectedNewsForm
          store={store}
          location={mockStoreState.location}
        />
      );
    });

    it('should map state to props', () => {
      renderedProps = wrapper.dive().props();
      expect(renderedProps.formValues).to.eq(selectNewsFormValues(mockStoreState));
      expect(renderedProps.promiseLoading).to.eq(selectUiStateLoading(mockStoreState));
    });
  });
 
});
