import {connect} from 'react-redux';
import * as ActionCreators from '../actions';
import {bindActionCreators} from 'redux';
import Pictures from '../screens/Pictures';

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);