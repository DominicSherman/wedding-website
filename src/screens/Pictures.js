import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';

import '../css/Pictures.css';
import * as ActionCreators from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Pictures extends Component {
    render() {
        console.log('this.props', this.props);
        const {pictures} = this.props;

        return (
            <Gallery
                photos={pictures}
            />
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);