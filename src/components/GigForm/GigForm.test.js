import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GigForm from './GigForm';
import Form from '../Form';
import { GET_GIG } from '../../queries';
import { EDIT_PRESS } from '../../mutations';

Enzyme.configure({ adapter: new Adapter() });

describe('(Component) GigForm', () => {
  let wrapper,
    props = {
      mutation: EDIT_PRESS,
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
            mutation={mutation}
            fields={fields}
            mutateId={id}
            refetchQueries={refetchQueries}
            baseUrl='/gigs'
            submitButtonCopy={isEdit ? 'Update a Gig' : 'Add Gig'}
            successCopy={{
                success: isEdit ? 'Successfully updated!' : 'Successfully created!',
                homeLink: 'Go to Gigs',
                createLink: isEdit ? 'Create a Gig' : 'Create another Gig'
            }}
            isEdit={isEdit}
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
