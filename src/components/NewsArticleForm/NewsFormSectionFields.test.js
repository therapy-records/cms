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

    let wrapper,
        props = {
            fields: mockFields
        };

    beforeEach(() => {
        wrapper = shallow(
            <NewsFormSectionFields {...props} />
        );
    });

    describe('rendering', () => {

        it('should render multiple list items', () => {
            expect(wrapper.find('li').length).to.eq(props.fields.length);
        });

        it('should render a list item with <Field /> for `copy`', () => {
           const li = wrapper.find('li').first();
           const actual = li.containsMatchingElement(
               <Field
                   name={`${props.fields[0]}.copy`}
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
                    name={`${props.fields[0]}.images`}
                    component={NewsFormSectionFieldImages}
                />
            );
            expect(actual).to.eq(true);
        });

        it('should render an `Add section` button', () => {
            const button = wrapper.find('button').last();
            expect(button.prop('type')).to.eq('button');
            expect(button.text()).to.eq('Add section');
        });
    });

});
