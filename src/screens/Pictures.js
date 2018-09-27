import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';

import '../css/screens/Pictures.css';
import * as ActionCreators from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Pictures extends Component {
    render() {
        const {config: {picturesVisible}, pictures} = this.props;

        return (
            picturesVisible ?
                <Gallery
                    photos={pictures}
                />
                :
                <div className={'Pictures-wrapper'}>
                    <p className={'Pictures-text'}>{'Pictures from the wedding day can be viewed here starting on May 28th.'}</p>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);