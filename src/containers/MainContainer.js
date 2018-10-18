import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ActionCreators from '../actions';
import Main from '../Main';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Main);