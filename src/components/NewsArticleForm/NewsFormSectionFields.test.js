import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {Field, FieldArray} from 'redux-form';
import NewsFormSectionFields from './NewsFormSectionFields';
import NewsFormSectionFieldImages from './NewsFormSectionFieldImages';
import RichTextEditor from '../RichTextEditor';
import {required} from '../../utils/form';

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
      push: fieldsPushSpy,
      remove: fieldsRemoveSpy,
      length: mockFields.length
    }
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

    it('should render a list item with <FieldArray /> for `images`', () => {
      const li = wrapper.find('li').first();
      const actual = li.containsMatchingElement(
        <FieldArray
          name={`${mockFields[0]}.images`}
          component={NewsFormSectionFieldImages}
        />
      );
      expect(actual).to.eq(true);
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
            }
          });

          const li = wrapper.find('li').first();
          const heading = li.find('h4');
          expect(heading.length).to.eq(0);
          const button = li.find('button');
          expect(button.length).to.eq(0);
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
