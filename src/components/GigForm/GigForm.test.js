import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GigForm from './GigForm';
import Form from '../Form';
import { GET_GIG } from '../../queries';
import { EDIT_GIG } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GigForm', () => {
  let wrapper,
    props = {
      mutation: EDIT_GIG,
      fields: [
        { id: 'a', value: 'testing' },
        { id: 'b', value: 'testing' },
      ],
      id: '1234',
      refetchQueries: [
        GET_GIG
      ]
    };

  beforeEach(() => {
    wrapper = shallow(
      <GigForm {...props} />
    );
  });

  it('should render <Form /> with correct props', () => {
    const actual = wrapper.containsMatchingElement(
        <Form
            mutation={props.mutation}
            fields={props.fields}
            mutateId={props.id}
            refetchQueries={props.refetchQueries}
            baseUrl='/gigs'
            submitButtonCopy='Add Gig'
            successCopy={{
                success: 'Successfully created!',
                homeLink: 'Go to Gigs',
                createLink: 'Create another Gig'
            }}
        />
    );
    expect(actual).to.equal(true);
  });

//   describe('with props.isEdit', () => {
//     it('should render <Form /> with correct props', () => {
//       wrapper.setProps({
//         isEdit: true
//       });

//       const actual = wrapper.containsMatchingElement(
//         <Form
//           mutation={props.mutation}
//           fields={props.fields}
//           mutateId={props.id}
//           refetchQueries={props.refetchQueries}
//           baseUrl='/gigs'
//           submitButtonCopy='Update article'
//           successCopy={{
//             success: 'Successfully updated!',
//             homeLink: 'Go to Gigs',
//             createLink: 'Create a Gig'
//           }}
//           isEdit
//         />
//       );
//       expect(actual).to.equal(true);
//     });
//   });

});
