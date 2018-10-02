import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ReactPlayer from 'react-player';

import * as ActionCreators from '../actions';
import '../css/screens/Pictures.css';

class Pictures extends Component {
    render() {
        const {config: {picturesVisible}, pictures, videos} = this.props;
        console.log('videos[0]', videos[0]);

        if (!picturesVisible) {
            return (
                <div className={'Pictures-wrapper'}>
                    <p className={'Pictures-text'}>{'🎉 Pictures from the wedding day can be viewed here starting on May 28th! 🎉'}</p>
                </div>
            );
        }

        return (
            pictures.length ?
                <div>
                    <Gallery
                        photos={pictures}
                    />
                    <ReactPlayer
                        url={'https://www.youtube.com/watch?v=l3gaZT9ixk4'}
                        playing
                    />
                </div>
                :
                <div className={'Pictures-wrapper'}>
                    <p className={'Pictures-text'}>{'No pictures have been uploaded yet 😕'}</p>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Pictures);