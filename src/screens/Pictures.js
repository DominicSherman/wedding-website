import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import '../css/screens/Pictures.css';
import {setPageViewed} from '../services/analytics-service';

export default class Pictures extends Component {
    componentDidMount() {
        setPageViewed('pictures')
    }

    render() {
        const {config: {picturesVisible}, pictures} = this.props;

        if (!picturesVisible) {
            return (
                <div className={'Pictures-wrapper'}>
                    <p className={'Pictures-text'}>{'🎉 Pictures uploaded using the app can be viewed here starting on May 28th! 🎉'}</p>
                </div>
            );
        }

        return (
            pictures.length ?
                <div>
                    <Gallery
                        photos={pictures}
                    />
                </div>
                :
                <div className={'Pictures-wrapper'}>
                    <p className={'Pictures-text'}>{'No pictures have been uploaded yet 😕'}</p>
                </div>
        );
    }
}