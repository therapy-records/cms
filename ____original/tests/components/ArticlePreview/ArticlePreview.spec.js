import React from 'react'
import ArticlePreview from 'components/ArticlePreview/ArticlePreview'
import ArticleLive from 'components/ArticleLive/ArticleLive'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) ArticlePreview', () => {
  let wrapper,
      props = {
        article: {
          title: 'asdfasdfasdf',
          mainImageUrl: 'http://something.png'
        }
      };

  it('should render a button', () => {
    wrapper = shallow(<ArticlePreview {...props} />);
    const actual = wrapper.containsMatchingElement(
      <button>Preview</button>
    );
    expect(actual).to.equal(true);
  });
  it('should not render <ModalContainer /> by default', () => {
    wrapper = shallow(<ArticlePreview {...props} />);
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
    wrapper = shallow(<ArticlePreview {...props} />);
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
});
