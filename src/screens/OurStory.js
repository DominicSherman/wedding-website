import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';

import bride from '../assets/bride.jpg';
import groom from '../assets/groom.jpg';
import '../scss/screens/OurStory.scss';
import loremIpsum from '../constants/lorem-ipsum-text';
import maryStory from '../constants/mary-story';
import dominicStory from '../constants/dominic-story';
import {photos} from '../constants/photo-gallery';
import BrideGroom from '../components/BrideGroom';

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
                        <BrideGroom
                            image={bride}
                            header={'THE BRIDE'}
                            story={maryStory}
                        />
                    </div>
                    <div className={'OurStory-wrapper column'}>
                        <BrideGroom
                            image={groom}
                            header={'THE GROOM'}
                            story={dominicStory}
                        />
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
                                <div className={'OurStory-caption row center'}>{item.description}</div>
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