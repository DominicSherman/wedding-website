import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

import bride from '../assets/bride.jpg';
import groom from '../assets/groom.jpg';
import '../css/TheCouple.css';
import loremIpsum from '../constants/lorem-ipsum-text';
import maryStory from '../constants/mary-story';
import {photos} from '../constants/photo-gallery';

export default class TheCouple extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'Couple-wrapper column'}>
                        <div className={'row center'}>
                            <img
                                alt={''}
                                className={'Couple-images'}
                                src={bride}
                            />
                        </div>
                        <div className={'row center'}>
                            <p className={'Couple-headerText'}>{'THE BRIDE'}</p>
                        </div>
                        <div className={'row center'}>
                            <div className={'Couple-bodyText'}>{maryStory}</div>
                        </div>
                    </div>
                    <div className={'Couple-wrapper column'}>
                        <div className={'row center'}>
                            <img
                                alt={''}
                                className={'Couple-images'}
                                src={groom}
                            />
                        </div>
                        <div className={'row center'}>
                            <p className={'Couple-headerText'}>{'THE GROOM'}</p>
                        </div>
                        <div className={'row center'}>
                            <div className={'Couple-bodyText'}>{loremIpsum}</div>
                        </div>
                    </div>
                </div>
                <hr
                    className={'Couple-divider'}
                    noshade="true"
                />
                <p className={'Couple-headerText2'}>{'PHOTOS'}</p>
                <div
                    className={'row center'}
                >
                    <ImageGallery
                        additionalClass={'Couple-imageGallery'}
                        items={photos}
                        showIndex
                    />
                </div>
            </div>
        );
    }
}