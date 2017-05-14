import React from 'react'
import { Field } from 'redux-form';
import {
  NewsPostForm,
  renderDropzoneInput,
  textInput,
  required,
  bodyMainRTE
} from 'components/NewsPostForm/NewsPostForm'
import { shallow } from 'enzyme'

describe('(Component) NewsPostForm', () => {
  let wrapper, props;

  beforeEach(() => {
    wrapper = shallow(<NewsPostForm {...props} />);
  });

  it('should render a heading', () => {
    const actual = wrapper.containsMatchingElement(
      <h2>Create/edit post</h2>
    );
    expect(actual).to.equal(true);
  });

  describe('form fields', () => {

    it('should render a mainImageUrl field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name="mainImageUrl"
               component={renderDropzoneInput} />
      );
      expect(actual).to.equal(true);      
    });

    it('should render a title field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name="title"
               component={textInput}
               type="text"
               placeholder="Hello World"
               label="Title"
               validate={required} />
      );
      expect(actual).to.equal(true);      
    });

    it('should render a bodyMain field', () => {
      const actual = wrapper.containsMatchingElement(
        <Field name="bodyMain"
               component={bodyMainRTE}
               validate={required} />
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
        <button type="submit" disabled={false}>Submit</button>
      );
      expect(actual).to.equal(true);
    });

    it('should call onSubmit prop onClick', () => {
      props = {
        onSubmit: sinon.spy(),
        error: false,
        pristine: false,
        submitting: false
      }
      const buttonWrapper = shallow(<NewsPostForm {...props} />);
      const button = buttonWrapper.find('button');
      button.simulate('click');
      props.onSubmit.should.have.been.called;
    });
    
  });

});
