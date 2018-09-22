import React, {Component} from 'react';
import LoadingScreen from 'react-loading-screen';
import Gallery from 'react-photo-gallery';

import '../css/Pictures.css';
import {getImages} from '../services/firebase-service';

export default class Pictures extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: null,
            isLoading: false
        };
    }

    componentDidMount() {
        getImages().on('value',
            (snapshot) =>
                this.setState({images: snapshot.val()})
        );
    }

    // checkImagesLoaded = (parentNode) => {
    //     const imgElements = [...parentNode.querySelectorAll("img")];
    //     for (let i = 0; i < imgElements.length; i += 1) {
    //         const img = imgElements[i];
    //         if (!img.complete) {
    //             return;
    //         }
    //     }
    //
    //     this.setState({isLoading: false})
    // };

    render() {
        let images = [],
            photoSet = [];

        if (this.state.images) {
            const imageSets = Object.keys(this.state.images).map((key) => {
                const sessionImages = this.state.images[key];
                return Object.keys(sessionImages).map((key) => sessionImages[key]);
            });
            imageSets.forEach((imageSet) => imageSet.forEach((image) => images = [...images, image]));
            photoSet = images.map(({url, width, height}) => {
                return {
                    src: url,
                    width,
                    height
                };
            });
        }

        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
            >
                <Gallery
                    photos={photoSet}
                />
            </LoadingScreen>
        );
    }
}