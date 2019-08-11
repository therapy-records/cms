import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { NewsFormSection }  from './NewsFormSection';
import NewsFormSectionField from './NewsFormSectionField';

Enzyme.configure({adapter: new Adapter()});

describe('(Component) NewsFormSection', () => {
  const mockSections = [
    'section[0]',
    'section[1]'
  ];

  let wrapper;
  const fieldsPushSpy = sinon.spy();
  const fieldsRemoveSpy = sinon.spy();
  const props = {
    fields: {
      map: callback => mockSections.map((field, index) => callback(field, index)),
      get: index => mockSections[index],
      push: fieldsPushSpy,
      remove: fieldsRemoveSpy,
      length: mockSections.length
    },
    updateSectionImages: () => {},
    removeSectionImage: () => {}
  };

  beforeEach(() => {
    wrapper = shallow(
      <NewsFormSection {...props} />
    );
  });

  describe('methods', () => {
    describe('handleUpdateSectionImages', () => {
      it('should call props.updateSectionImages', () => {
        const updateSectionImagesSpy = sinon.spy();
        wrapper = shallow(
          <NewsFormSection
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
          <NewsFormSection
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

    it('should render <NewsFormSectionField />', () => {
      const actual = wrapper.containsMatchingElement(
        <NewsFormSectionField
          fields={props.fields}
          section={mockSections[0]}
          sectionIndex={0}
          onUpdateSectionImages={wrapper.instance().handleUpdateSectionImages}
          onRemoveSectionImage={wrapper.instance().handleRemoveSectionImage}
        />
      );
      expect(actual).to.eq(true);
    });
  
    describe('`Add section` button', () => {
      it('should render', () => {
        const button = wrapper.find('button').last();
        expect(button.prop('type')).to.eq('button');
        expect(button.text()).to.eq('New section');
      });

      it('should call props.fields.push onClick', () => {
          const button = wrapper.find('button').last();
          button.simulate('click');
          expect(fieldsPushSpy).to.have.been.calledOnce;
      });
    });

  });
});
