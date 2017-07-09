import React from 'react'
import ArticlePreview from 'components/ArticlePreview/ArticlePreview'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { shallow } from 'enzyme'

describe('(Component) ArticlePreview', () => {
  let wrapper,
      props = {
        post: {
          title: 'asdfasdfasdf',
          mainImageUrl: 'http://something.png'
        }
      };

  it('should render a button', () => {
    wrapper = shallow(<ArticlePreview {...props} />);
    const actual = wrapper.containsMatchingElement(
      <button>Preview post</button>
    );
    expect(actual).to.equal(true);
  });
  it('should not render <ModalContainer /> by default', () => {
    wrapper = shallow(<ArticlePreview {...props} />);
    const actual = wrapper.containsMatchingElement(
      <ModalContainer>
        <ModalDialog>
          <h3>{props.post.title}</h3>
          <img src={props.post.mainImageUrl} />
          <p>full article template here...</p>
        </ModalDialog>
      </ModalContainer>
    );
    expect(actual).to.equal(false);
  });

  it('should render <ModalContainer /> on button click', () => {
    wrapper = shallow(<ArticlePreview {...props} />);
    const button = wrapper.find('button');
    button.simulate('click');
    const actual = wrapper.containsMatchingElement(
      <ModalContainer>
        <ModalDialog>
          <h3>{props.post.title}</h3>
          <img src={props.post.mainImageUrl} />
          <p>full article template here...</p>
        </ModalDialog>
      </ModalContainer>
    );
    expect(actual).to.equal(true);
  });
});
