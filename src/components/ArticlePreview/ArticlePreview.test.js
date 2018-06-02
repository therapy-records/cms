import React from 'react'

import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedArticlePreview, { ArticlePreview } from './ArticlePreview'
import ArticleLive from '../ArticleLive/ArticleLive'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [];
const mockState = {
  form: {
    NEWS_ARTICLE_FORM: {
      values: {
        myNewsTitle: 'testing'
      }
    }
  }
};
const mockDispatch = {};
const configMockStore = configureMockStore(middlewares);
const mockStore = configMockStore(mockState, mockDispatch);

describe('(Component) ArticlePreview', () => {
  let wrapper,
    props = {
      article: {
        title: 'asdfasdfasdf',
        mainImageUrl: 'http://something.png'
      }
    };

  beforeEach(() => {
    wrapper = shallow(<ArticlePreview {...props} />);
  });

  it('should render a button', () => {
    const actual = wrapper.containsMatchingElement(
      <button>Preview</button>
    );
    expect(actual).to.equal(true);
  });

  it('should not render <ModalContainer /> by default', () => {
    const actual = wrapper.containsMatchingElement(
      <ModalContainer>
        <ModalDialog>
          <ArticleLive article={props.article} />
        </ModalDialog>
      </ModalContainer>
    );
    expect(actual).to.equal(false);
  });

  it('should render <ModalContainer /> with <ArticleLive /> on button click', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    const actual = wrapper.containsMatchingElement(
      <ModalContainer>
        <ModalDialog>
          <ArticleLive article={props.article} />
        </ModalDialog>
      </ModalContainer>
    );
    expect(actual).to.equal(true);
  });

  describe('methods', () => {
    describe('handleModalOpen', () => {
      it('should set isShowingModal to true', () => {
        let currentState = wrapper.instance().state;
        expect(currentState).to.deep.eq({
          isShowingModal: false
        });
        wrapper.instance().handleModalOpen();
        currentState = wrapper.instance().state;
        expect(currentState).to.deep.eq({
          isShowingModal: true
        });
      });
    });

    describe('handleModalClose', () => {
      it('should set isShowingModal to false', () => {
        wrapper.instance().handleModalOpen();
        let currentState = wrapper.instance().state;
        expect(currentState.isShowingModal).to.eq(true);
        wrapper.instance().handleModalClose();
        currentState = wrapper.instance().state;
        expect(currentState.isShowingModal).to.eq(false);
      });
    });
  });

  describe('ConnectedArticlePreview', () => {
    it('should have correct mapped props', () => {
      const connectedArticlePreview = shallow(
        <ConnectedArticlePreview store={mockStore}/>
      );
      expect(connectedArticlePreview.prop('article')).to.deep.eq(mockState.form.NEWS_ARTICLE_FORM.values);
      expect(connectedArticlePreview.prop('disabled')).to.eq(true);
    });
  });
});
