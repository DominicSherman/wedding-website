import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

import bride from '../assets/bride.jpg';
import groom from '../assets/groom.jpg';
import '../css/TheCouple.css';
import loremIpsum from '../constants/lorem-ipsum-text';
import {photos} from '../constants/photo-gallery';

export default class TheCouple extends Component {
    render() {
        return (
            <div>
                <div className={'row'}>
                    <div className={'column'}>
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
                            <div className={'Couple-bodyText'}>{loremIpsum} </div>
                        </div>
                    </div>
                    <div className={'column'}>
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
                            <div className={'Couple-bodyText'}>{loremIpsum} </div>
                        </div>
                    </div>
                </div>
                <hr
                    className={'Couple-divider'}
                    noshade="true"
                />
                <p className={'Couple-headerText'}>{'PHOTOS'}</p>
                <ImageGallery
                    items={photos}
                    renderItem={(item) =>
                        <div className={'Couple-images'}>
                            <img
                                src={item.original}
                            />
                        </div>
                    }
                />
            </div>
        );
    }
}