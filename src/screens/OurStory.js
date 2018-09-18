import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

import bride from '../assets/bride.jpg';
import groom from '../assets/groom.jpg';
import '../css/OurStory.css';
import loremIpsum from '../constants/lorem-ipsum-text';
import maryStory from '../constants/mary-story';
import dominicStory from '../constants/dominic-story';
import {photos} from '../constants/photo-gallery';

export default class OurStory extends Component {
    getImageStyle = () => {
        if (!window.screenTop && !window.screenY) {
            return {
                height: '50%',
                width: '50%'
            };
        }
    };

    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'OurStory-wrapper column'}>
                        <div className={'row center'}>
                            <img
                                alt={''}
                                className={'OurStory-images'}
                                src={bride}
                            />
                        </div>
                        <div className={'row center'}>
                            <p className={'OurStory-headerText'}>{'THE BRIDE'}</p>
                        </div>
                        <div className={'row center'}>
                            <div className={'OurStory-bodyText'}>{maryStory}</div>
                        </div>
                    </div>
                    <div className={'OurStory-wrapper column'}>
                        <div className={'row center'}>
                            <img
                                alt={''}
                                className={'OurStory-images'}
                                src={groom}
                            />
                        </div>
                        <div className={'row center'}>
                            <p className={'OurStory-headerText'}>{'THE GROOM'}</p>
                        </div>
                        <div className={'row center'}>
                            <div className={'OurStory-bodyText'}>{dominicStory}</div>
                        </div>
                    </div>
                </div>
                <hr
                    className={'OurStory-divider'}
                    noshade="true"
                />
                <p className={'OurStory-headerText2'}>{'PHOTOS'}</p>
                <div className={'row center'}>
                    <ImageGallery
                        additionalClass={'OurStory-imageGallery'}
                        items={photos}
                        renderItem={(item) =>
                            <div style={this.getImageStyle()}>
                                <img
                                    alt={''}
                                    src={item.original}
                                />
                            </div>
                        }
                        showIndex
                    />
                </div>
                <hr
                    className={'OurStory-divider'}
                    noshade="true"
                />
                <p className={'OurStory-headerText2'}>{'THE BEST MAN'}</p>
                <div className={'row'}>
                    <div className={'OurStory-bodyText'}>{loremIpsum}</div>
                </div>
            </div>
        );
    }
}