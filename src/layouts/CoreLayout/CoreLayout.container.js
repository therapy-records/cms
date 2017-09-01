import { connect } from 'react-redux';
import CoreLayout from './CoreLayout';

const mapStateToProps = (state) => ({
  isAuthenticated : state.user.isAuth
});

export default connect(mapStateToProps, {})(CoreLayout);
