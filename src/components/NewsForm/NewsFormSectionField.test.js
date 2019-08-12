import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Field } from 'redux-form';
import NewsFormSectionField from './NewsFormSectionField';
import TextInput from '../../components/TextInput';
import DropzoneImageUpload from '../DropzoneImageUpload';
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
  const updateSectionImagesSpy = sinon.spy();
  const removeSectionImageSpy = sinon.spy();

  const props = {
    section: 'section[0]',
    onUpdateSectionImages: updateSectionImagesSpy,
    onRemoveSectionImage: removeSectionImageSpy,
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

    describe('componentWillMount', () => {
      it('should call onToggleShowImageUpload when images exist', () => {
        const onToggleShowImageUploadSpy = sinon.spy();
        wrapper.instance().onToggleShowImageUpload = onToggleShowImageUploadSpy;
        wrapper.instance().componentWillMount();
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
        wrapper.instance().componentWillMount();
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
          required
        />
      );
      expect(actual).to.eq(true);
    });

    describe('<DropzoneImageUpload />', () => {
      describe('when state.showImageUpload is false', () => {
        beforeEach(() => {
          wrapper.setState({
            showImageUpload: false
          });
        });

        it('should NOT be rendered', () => {
          const dropzoneImageUpload = wrapper.find('DropzoneImageUpload');
          expect(dropzoneImageUpload.length).to.eq(0);
        });

        it('should render `Add image` button', () => {
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

        it('should render <DropzoneImageUpload />', () => {
          const dropzoneImageUpload = wrapper.find('DropzoneImageUpload');
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
              updateSectionImages: () => { },
              removeSectionImage: () => { }
            });

            const dropzoneImageUpload = wrapper.find('DropzoneImageUpload');
            expect(dropzoneImageUpload.prop('existingImages')).to.deep.eq([]);
          });
        });

        describe('DropzoneImageUpload onChange prop', () => {
          it('should call props.onUpdateSectionImages', () => {
            const dropzoneImageUpload = wrapper.find('DropzoneImageUpload');
            dropzoneImageUpload.props().onChange(
              mockFields[1].images[1].url,
              1
            );
            expect(updateSectionImagesSpy).to.have.been.called;
            expect(updateSectionImagesSpy).to.have.been.calledWith(
              mockFields[1].images[1].url,
              1,
              props.sectionIndex
            );
          });
        });

        describe('DropzoneImageUpload onRemove prop', () => {
          it('should call props.onRemoveSectionImage', () => {
            const dropzoneImageUpload = wrapper.find('DropzoneImageUpload');
            dropzoneImageUpload.props().onRemove(
              2
            );
            expect(removeSectionImageSpy).to.have.been.called;
            expect(removeSectionImageSpy).to.have.been.calledWith(
              2,
              props.sectionIndex
            );
          });
        });

        it('should NOT render `Add image` button', () => {
          const actual = wrapper.containsMatchingElement(
            <button
              onClick={wrapper.instance().onToggleShowImageUpload}
            >
              Add image
          </button>
          );
          expect(actual).to.eq(false);
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
