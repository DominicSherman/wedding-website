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
        let all = [],
            photos = [],
            videos = [];

        if (this.state.images) {
            const sets = Object.keys(this.state.images).map((key) => {
                const sessionImages = this.state.images[key];
                return Object.keys(sessionImages).map((key) => sessionImages[key]);
            });
            sets.forEach((set) => set.forEach((item) => all = [...all, item]));

            all.forEach(({url, width, height, isVideo}) => {
                if (isVideo) {
                    videos = [
                        ...videos,
                        {
                            src: url,
                            width,
                            height
                        }
                    ];
                } else {
                    photos = [
                        ...photos,
                        {
                            src: url,
                            width,
                            height
                        }
                    ]
                }
            });
        }

        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor='#f1f1f1'
                spinnerColor='#9ee5f8'
            >
                <Gallery
                    photos={photos}
                />
            </LoadingScreen>
        );
    }
}