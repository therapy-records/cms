import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Field } from 'redux-form';
import NewsFormSectionFieldImages, { NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS } from './NewsFormSectionFieldImages';
import DropzoneImageUpload from './DropzoneImageUpload';
import { EMPTY_ARTICLE_SECTION_OBJ } from '../../utils/news';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) NewsFormSectionFieldImages', () => {
  const mockFields = [
    { url: 'test.com' },
    { url: 'test2.com' }
  ];

  let wrapper,
    props = {
      fields: {
        map: callback => mockFields.map((field, index) => callback(field, index)),
        push: obj => mockFields.push(obj),
        get: index => mockFields[index],
        length: mockFields.length
      }
    };

  beforeEach(() => {
    wrapper = shallow(
      <NewsFormSectionFieldImages {...props} />
    );
  });

  describe('rendering', () => {

    it('should render multiple <Fields />', () => {
      expect(wrapper.find('Field').length).to.eq(mockFields.length);
    });

    it('should a <Field /> for Image ', () => {
      const actual = wrapper.containsMatchingElement(
        <Field
          name={`${mockFields[0]}.url`}
          title='Image'
          component={DropzoneImageUpload}
          existingImage={mockFields[0].url}
          minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
        />
      );
      expect(actual).to.eq(true);
    });

    describe('when there are no props.fields', () => {
      const fieldsPushSpy = sinon.spy();
      beforeEach(() => {
        const mockEmptyFields = [];
        wrapper.setProps({
          fields: {
            map: callback => [],
            push: fieldsPushSpy,
            get: index => mockEmptyFields[index],
            length: mockEmptyFields.length
          }
        })
      });

      it('should call fields.push with empty section object', () => {
        expect(fieldsPushSpy).to.have.been.calledOnce;
        expect(fieldsPushSpy).to.have.been.calledWith(EMPTY_ARTICLE_SECTION_OBJ);
      });

      it('should render a <Field /> for Image', () => {
        const actual = wrapper.containsMatchingElement(
          <Field
            name={`${props.fields[0]}.url`}
            title='Image'
            component={DropzoneImageUpload}
            minImageDimensions={NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS}
          />
        );
        expect(actual).to.eq(true);
      });

    });

  });

});
