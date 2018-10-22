import {bindActionCreators} from 'redux';
import * as ActionCreators from '../actions';
import {connect} from 'react-redux';
import HomeButtons from '../components/HomeButtons';

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

export default connect(null, mapDispatchToProps)(HomeButtons);