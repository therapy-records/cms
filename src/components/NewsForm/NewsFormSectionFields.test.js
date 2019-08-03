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
    updateSectionImages: () => {},
    removeSectionImage: () => {}
  };

  beforeEach(() => {
    wrapper = shallow(
      <NewsFormSectionFields {...props} />
    );
  });

  describe('methods', () => {
    describe('handleUpdateSectionImages', () => {
      it('should call props.updateSectionImages', () => {
        const updateSectionImagesSpy = sinon.spy();
        wrapper = shallow(
          <NewsFormSectionFields
            {...props}
            updateSectionImages={updateSectionImagesSpy}
          />
        );

        wrapper.instance().handleUpdateSectionImages(
          'testImage.png',
          1,
          3
        );
        expect(updateSectionImagesSpy).to.have.been.calledWith(
          'NEWS_FORM',
          `sections.3.images.1.url`,
          'testImage.png'
        );
      });
    });

    describe('handleRemoveSectionImage', () => {
      it('should call props.removeSectionImage', () => {
        const removeSectionImageSpy = sinon.spy();
        wrapper = shallow(
          <NewsFormSectionFields
            {...props}
            removeSectionImage={removeSectionImageSpy}
          />
        );

        wrapper.instance().handleRemoveSectionImage(
          2,
          3
        );
        expect(removeSectionImageSpy).to.have.been.calledWith(
          'NEWS_FORM',
          `sections.3.images`,
          2
        );
      });
    });
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
          expect(button.text()).to.eq('Remove section');
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
            updateSectionImages: () => {},
            removeSectionImage: () => {}
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

    describe('<DropzoneImageUpload />', () => {
      it('should render in a list item', () => {
        const li = wrapper.find('li').first();
        const dropzoneImageUpload = li.find('DropzoneImageUpload');
        expect(dropzoneImageUpload.length).to.eq(1);
        expect(dropzoneImageUpload.prop('title')).to.eq('Images');
        expect(dropzoneImageUpload.prop('component')).to.eq(DropzoneImageUpload);
        const expectedExistingImages = [
          ...mockFields[0].images.map(imageObj => imageObj.url)
        ];

        expect(dropzoneImageUpload.prop('existingImages')).to.deep.eq(expectedExistingImages);
        expect(dropzoneImageUpload.prop('minImageDimensions')).to.eq(NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS);
        expect(dropzoneImageUpload.prop('onChange')).to.be.a('function');
        expect(dropzoneImageUpload.prop('onRemove')).to.be.a('function');
      });

      describe('when there are no exisiting images in sthe section', () => {
        it('should pass empty array to <DropzoneImageUpload />', () => {
          const _mockFields = [{
            images: []
          }];

          wrapper.setProps({
            fields: {
              map: callback => _mockFields.map((field, index) => callback(field, index)),
              get: index => _mockFields[index],
            },
            updateSectionImages: () => {},
            removeSectionImage: () => {}
          });

          const li = wrapper.find('li').first();
          const dropzoneImageUpload = li.find('DropzoneImageUpload');
          expect(dropzoneImageUpload.prop('existingImages')).to.deep.eq([]);
        });
      });

      describe('DropzoneImageUpload onChange prop', () => {
        it('should call handleUpdateSectionImages', () => {
          const handleUpdateSectionImagesSpy = sinon.spy();
          wrapper.instance().handleUpdateSectionImages = handleUpdateSectionImagesSpy;
          const li = wrapper.find('li').last(1);
          const dropzoneImageUpload = li.find('DropzoneImageUpload');
          dropzoneImageUpload.props().onChange(
            mockFields[1].images[1].url,
            1
          );
          expect(handleUpdateSectionImagesSpy).to.have.been.called;
          expect(handleUpdateSectionImagesSpy).to.have.been.calledWith(
            mockFields[1].images[1].url,
            1,
            1
          );
        });
      });

      describe('DropzoneImageUpload onRemove prop', () => {
        it('should call handleUpdateSectionImages', () => {
          const handleRemoveSectionImageSpy = sinon.spy();
          wrapper.instance().handleRemoveSectionImage = handleRemoveSectionImageSpy;
          const li = wrapper.find('li').last(1);
          const dropzoneImageUpload = li.find('DropzoneImageUpload');
          dropzoneImageUpload.props().onRemove(
            2,
            1
          );
          expect(handleRemoveSectionImageSpy).to.have.been.called;
          expect(handleRemoveSectionImageSpy).to.have.been.calledWith(
            2,
            1
          );
        });
      });

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
