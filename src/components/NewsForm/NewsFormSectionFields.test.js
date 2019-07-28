import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Field } from 'redux-form';
import { NewsFormSectionFields }  from './NewsFormSectionFields';
import DropzoneImageUpload from '../NewsForm/DropzoneImageUpload';
import RichTextEditor from '../RichTextEditor';
import { required } from '../../utils/form';
import { NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS } from '../../utils/news';

Enzyme.configure({adapter: new Adapter()});

describe('(Component) NewsFormSectionFields', () => {
  const mockFields = [
    {
      copy: 'testing',
      images: [
        {url: 'test.com'},
        {url: 'test.com'}
      ]
    },
    {
      copy: 'testing2',
      images: [
        {url: 'test2.com'},
        {url: 'test2.com'}
      ]
    }
  ];

  let wrapper;
  const fieldsPushSpy = sinon.spy();
  const fieldsRemoveSpy = sinon.spy();
  const props = {
    fields: {
      map: callback => mockFields.map((field, index) => callback(field, index)),
      get: index => mockFields[index],
      push: fieldsPushSpy,
      remove: fieldsRemoveSpy,
      length: mockFields.length
    },
    updateSectionImages: () => {}
  };

  beforeEach(() => {
    wrapper = shallow(
      <NewsFormSectionFields {...props} />
    );
  });

  describe('rendering', () => {

    it('should render multiple list items', () => {
      expect(wrapper.find('li').length).to.eq(mockFields.length);
    });

    describe('field/section heading', () => {
      it('should render a heading', () => {
        const li = wrapper.find('li').first();
        const actual = li.containsMatchingElement(
          <h4>Section 1</h4>
        );
        expect(actual).to.eq(true);
      });

      describe('`remove` button', () => {
        it('should render', () => {
          const li = wrapper.find('li').first();
          const button = li.find('button');
          expect(button.prop('type')).to.eq('button');
          expect(button.text()).to.eq('Remove');
        });
        it('should call props.fields.remove onClick', () => {
          const li = wrapper.find('li').first();
          const button = li.find('button');
          button.simulate('click');
          expect(fieldsRemoveSpy).to.have.been.calledOnce;
        });
      });

      describe('when field/section length is 1', () => {
        it('should NOT render a heading or button', () => {
          const _mockFields = [
            mockFields[0]
          ];

          wrapper.setProps({
            fields: {
              map: callback => _mockFields.map((field, index) => callback(field, index)),
              get: index => mockFields[index],
            },
            updateSectionImages: () => {}
          });

          const li = wrapper.find('li').first();
          const heading = li.find('h4');
          expect(heading.length).to.eq(0);
          const button = li.find('button');
          expect(button.length).to.eq(0);
        });
      });
    });

    it('should render a list item with <Field /> for `copy`', () => {
      const li = wrapper.find('li').first();
      const actual = li.containsMatchingElement(
        <Field
          name={`${mockFields[0]}.copy`}
          title="Copy"
          component={RichTextEditor}
          validate={required}
          required
        />
      );
      expect(actual).to.eq(true);
    });


    it('should render a list item with <DropzoneImageUpload />', () => {
      const li = wrapper.find('li').first();
      const dropzoneImageUpload = li.find('DropzoneImageUpload');
      expect(dropzoneImageUpload.length).to.eq(1);
      expect(dropzoneImageUpload.prop('component')).to.eq(DropzoneImageUpload);
      const expectedExistingImages = [
        ...mockFields[0].images.map(imageObj => imageObj.url)
      ];

      expect(dropzoneImageUpload.prop('existingImages')).to.deep.eq(expectedExistingImages);
      expect(dropzoneImageUpload.prop('minImageDimensions')).to.eq(NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS);
      expect(dropzoneImageUpload.prop('onChange')).to.be.a('function');
    });

    describe('`Add section` button', () => {
      it('should render', () => {
        const button = wrapper.find('button').last();
        expect(button.prop('type')).to.eq('button');
        expect(button.text()).to.eq('Add section');
      });

      it('should call props.fields.push onClick', () => {
          const button = wrapper.find('button').last();
          button.simulate('click');
          expect(fieldsPushSpy).to.have.been.calledOnce;
      });
    });

  });
});