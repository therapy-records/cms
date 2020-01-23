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
    onDeleteArticle: () => {},
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

    describe('<ArticleHeader />', () => {
      it('should render', () => {
        const articleHeader = wrapper.find('ArticleHeader');
        expect(articleHeader.length).to.eq(1);
        expect(articleHeader.prop('baseUrl')).to.eq('/news');
        expect(articleHeader.prop('article')).to.eq(props.formValues);
        expect(articleHeader.prop('onDeleteArticle')).to.eq(null);
        expect(articleHeader.prop('heading')).to.eq('Create News 🗞️');
        expect(articleHeader.prop('promiseLoading')).to.eq(props.promiseLoading);
        expect(articleHeader.prop('showDeleteButton')).to.eq(false);
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
          const articleHeader = wrapper.find('ArticleHeader');
          expect(articleHeader.prop('onDeleteArticle')).to.be.a('function');
          expect(articleHeader.prop('heading')).to.eq(`Editing ${props.formValues.title} 🗞️`);
          expect(articleHeader.prop('showDeleteButton')).to.eq(true);
        });

        describe('onDeleteArticle prop', () => {
          it('should call props.onDeleteArticle with article id', () => {
            const onDeleteArticleSpy = sinon.spy();
            wrapper.setProps({
              onDeleteArticle: onDeleteArticleSpy
            });
            const articleHeader = wrapper.find('ArticleHeader');
            articleHeader.props().onDeleteArticle();
            expect(onDeleteArticleSpy).to.have.been.calledWith(props.articleId)
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
