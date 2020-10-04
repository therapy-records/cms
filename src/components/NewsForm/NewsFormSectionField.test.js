import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Field } from 'redux-form';
import NewsFormSectionField from './NewsFormSectionField';
import TextInput from '../../components/TextInput';
import RichTextEditor from '../RichTextEditor';
import { required } from '../../utils/form';
import { NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS } from '../../utils/news';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) NewsFormSectionField', () => {
  let wrapper;

  const mockFields = [
    {
      copy: 'testing',
      images: [
        { url: 'test.com' },
        { url: 'test.com' }
      ]
    },
    {
      copy: 'testing2',
      images: [
        { url: 'test2.com' },
        { url: 'test2.com' }
      ]
    }
  ];
  const fieldsPushSpy = sinon.spy();
  const fieldsRemoveSpy = sinon.spy();
  const onUpdateSectionImagesSpy = sinon.spy();
  const onRemoveSectionImageSpy = sinon.spy();

  const props = {
    section: 'section[0]',
    onUpdateSectionImages: onUpdateSectionImagesSpy,
    onRemoveSectionImage: onRemoveSectionImageSpy,
    fields: {
      map: callback => mockFields.map((field, index) => callback(field, index)),
      get: index => mockFields[index],
      push: fieldsPushSpy,
      remove: fieldsRemoveSpy,
      length: mockFields.length
    },
    sectionIndex: 0
  };

  beforeEach(() => {
    wrapper = shallow(
      <NewsFormSectionField {...props} />
    );
  });

  describe('methods', () => {

    describe('componentDidMount', () => {
      it('should call onToggleShowImageUpload when images exist', () => {
        const onToggleShowImageUploadSpy = sinon.spy();
        wrapper.instance().onToggleShowImageUpload = onToggleShowImageUploadSpy;
        wrapper.instance().componentDidMount();
        expect(onToggleShowImageUploadSpy).to.have.been.called;
      });

      it('should call onToggleShowVideoEmbed when videoEmbed exists', () => {
        const onToggleShowVideoEmbedSpy = sinon.spy();

        const _mockFields = [
          {
            ...mockFields[0],
            videoEmbed: '<iframe />'
          }
        ];

        wrapper.setProps({
          ...props,
          fields: {
            map: callback => _mockFields.map((field, index) => callback(field, index)),
            get: index => _mockFields[index],
          }
        });
        wrapper.instance().onToggleShowVideoEmbed = onToggleShowVideoEmbedSpy;
        wrapper.instance().componentDidMount();
        expect(onToggleShowVideoEmbedSpy).to.have.been.called;
      });

    });

    describe('onToggleShowImageUpload', () => {
      it('should set state.showImageUpload to true', () => {
        wrapper.instance().onToggleShowImageUpload();
        expect(wrapper.state().showImageUpload).to.eq(true);
      });
    });

    describe('onToggleShowVideoEmbed', () => {
      it('should set state.showVideoEmbed to true', () => {
        wrapper.instance().onToggleShowVideoEmbed();
        expect(wrapper.state().showVideoEmbed).to.eq(true);
      });
    });

  });

  describe('rendering', () => {

    describe('field/section heading', () => {
      it('should render a heading', () => {
        const actual = wrapper.containsMatchingElement(
          <h4>Section 1</h4>
        );
        expect(actual).to.eq(true);
      });

      describe('`remove` button', () => {
        it('should render', () => {
          const button = wrapper.find('.btn-danger');
          expect(button.prop('type')).to.eq('button');
          expect(button.text()).to.eq('Remove section');
        });
        it('should call props.fields.remove onClick', () => {
          const button = wrapper.find('.btn-danger');
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
            ...props,
            fields: {
              map: callback => _mockFields.map((field, index) => callback(field, index)),
              get: index => mockFields[index],
            }
          });

          const heading = wrapper.find('h4');
          expect(heading.length).to.eq(0);
          const button = wrapper.find('.btn-danger');
          expect(button.length).to.eq(0);
        });
      });
    });

    it('should render a list item with <Field /> for `copy`', () => {
      const actual = wrapper.containsMatchingElement(
        <Field
          name={`${props.section}.copy`}
          title="Copy"
          component={RichTextEditor}
          validate={required}
          placeholder='This month has been fantastic...'
          required
        />
      );
      expect(actual).to.eq(true);
    });

    describe('ImageUpload', () => {

      describe('when state.showImageUpload is false', () => {
        beforeEach(() => {
          wrapper.setState({
            showImageUpload: false
          });
        });

        it('should render an `add image` button', () => {
          const imageUpload = wrapper.find('ImageUploadContainer');
          expect(imageUpload.length).to.eq(0);

          const actual = wrapper.containsMatchingElement(
            <button
              onClick={wrapper.instance().onToggleShowImageUpload}
            >
              Add image
          </button>
          );
          expect(actual).to.eq(true);
        });
      });

      describe('when state.showImageUpload is true', () => {
        beforeEach(() => {
          wrapper.setState({
            showImageUpload: true
          });
        });


        it('should render <ImageUploadContainer />', () => {
          const imageUpload = wrapper.find('ImageUploadContainer');
          expect(imageUpload.length).to.eq(1);
          expect(imageUpload.prop('existingImages')).to.deep.eq(mockFields[0].images);
          expect(imageUpload.prop('minImageDimensions')).to.eq(NEWS_ARTICLE_MIN_IMAGE_DIMENSIONS);
          expect(imageUpload.prop('handleOnUpload')).to.be.a('function');
          expect(imageUpload.prop('handleOnRemove')).to.be.a('function');
          expect(imageUpload.prop('multiple')).to.eq(true);
        });

        describe('when there are no exisiting images in the section', () => {
          it('should pass empty array to <ImageUpload />', () => {
            const _mockFieldsEmptyImages = [{
              images: []
            }];

            wrapper.setProps({
              fields: {
                map: callback => _mockFieldsEmptyImages.map((field, index) => callback(field, index)),
                get: index => _mockFieldsEmptyImages[index],
              },
              updateSectionImages: () => {},
              removeSectionImage: () => {}
            });

            const imageUpload = wrapper.find('ImageUploadContainer');
            expect(imageUpload.length).to.eq(1);
            expect(imageUpload.prop('existingImages')).to.deep.eq([]);
          });
        });

        describe('ImageUpload handleOnUpload prop', () => {
          it('should call props.onUpdateSectionImages', () => {
            const imageUpload = wrapper.find('ImageUploadContainer');
            imageUpload.props().handleOnUpload(
              mockFields[1].images[1].url,
              1
            );
            expect(onUpdateSectionImagesSpy).to.have.been.called;
            expect(onUpdateSectionImagesSpy).to.have.been.calledWith(
              mockFields[1].images[1].url,
              1,
              props.sectionIndex
            );
          });
        });

        describe('ImageUpload handleOnRemove prop', () => {
          it('should call props.onRemoveSectionImage', () => {
            const imageUpload = wrapper.find('ImageUploadContainer');
            imageUpload.props().handleOnRemove(
              2
            );
            expect(onRemoveSectionImageSpy).to.have.been.called;
            expect(onRemoveSectionImageSpy).to.have.been.calledWith(
              2,
              props.sectionIndex
            );
          });
        });
      });
    });

    describe('videoEmbed field', () => {
      it('should NOT render by default', () => {
        const actual = wrapper.containsMatchingElement(
          <Field
            name={`${props.section}.videoEmbed`}
            type='text'
            label='Video (iframe embed)'
            component={TextInput}
            placeholder='<iframe .... />'
          />
        );
        expect(actual).to.eq(false);
      });

      it('should render `Add video` button', () => {
        const actual = wrapper.containsMatchingElement(
          <button
            onClick={wrapper.instance().onToggleShowVideoEmbed}
          >
            Add video (iframe embed)
          </button>
        );
        expect(actual).to.eq(true);
      });
    
      describe('when state.showVideoEmbed is true', () => {
        beforeEach(() => {
          wrapper.setState({
            showVideoEmbed: true
          });
        });
        it('should render <Field />', () => {
          const actual = wrapper.containsMatchingElement(
            <Field
              name={`${props.section}.videoEmbed`}
              type='text'
              label='Video (iframe embed)'
              component={TextInput}
              placeholder='<iframe .... />'
            />
          );
          expect(actual).to.eq(true);
        });

        it('should NOT render `Add video` button', () => {
          const actual = wrapper.containsMatchingElement(
            <button
              onClick={wrapper.instance().onToggleShowVideoEmbed}
            >
              Add video (iframe embed)
          </button>
          );
          expect(actual).to.eq(false);
        });

      });
    });

  });
});
