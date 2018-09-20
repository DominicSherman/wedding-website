import React, {Component} from 'react';
import LoadingScreen from 'react-loading-screen';

import '../css/Pictures.css';
import {getImages} from '../services/firebase-service';

export default class Pictures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: {},
            isLoading: true
        };
    }

    componentDidMount() {
        getImages().on('value',
            (snapshot) =>
                this.setState({images: snapshot.val()})
        );
    }

    checkImagesLoaded = (parentNode) => {
        const imgElements = [...parentNode.querySelectorAll("img")];
        for (let i = 0; i < imgElements.length; i += 1) {
            const img = imgElements[i];
            if (!img.complete) {
                return;
            }
        }

        this.setState({isLoading: false})
    };

    render() {
        let urls = [];

        const imageSets = Object.keys(this.state.images).map((key) => {
            const sessionImages = this.state.images[key];
            return Object.keys(sessionImages).map((key) => sessionImages[key].url);
        });
        imageSets.forEach((imageSet) => imageSet.forEach((image) => urls = [...urls, image]));

        const renderedImages = urls.map((url) =>
            <div className={'Pictures-imageWrapper'}>
                <img
                    className={'Pictures-image'}
                    src={url}
                    onLoad={() => this.checkImagesLoaded(this.galleryElement)}
                />
            </div>
        );

        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
            >
                <div
                    className={'row center'}
                    ref={(r) => this.galleryElement = r}
                >
                    {renderedImages}
                </div>
            </LoadingScreen>
        );
    }
}