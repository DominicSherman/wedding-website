import React, {Component} from 'react';

import bride from '../assets/Bride.jpg';
import groom from '../assets/Groom.jpg';
import '../css/TheCouple.css';
import loremIpsum from '../constants/lorem-ipsum-text';

export default class TheCouple extends Component {
    render() {
        return (
            <div className={'Couple-wrapper'}>
                <div className={'Couple-column'}>
                    <div className={'Couple-row'}>
                        <img
                            alt={''}
                            className={'Couple-images'}
                            src={bride}
                        />
                    </div>
                    <div className={'Couple-row'}>
                        <p className={'Couple-headerText'}>{'THE BRIDE'}</p>
                    </div>
                    <div className={'Couple-row'}>
                        <div className={'Couple-bodyText'}>{loremIpsum} </div>
                    </div>
                </div>
                <div className={'Couple-column'}>
                    <div className={'Couple-row'}>
                        <img
                            alt={''}
                            className={'Couple-images'}
                            src={groom}
                        />
                    </div>
                    <div className={'Couple-row'}>
                        <p className={'Couple-headerText'}>{'THE GROOM'}</p>
                    </div>
                    <div className={'Couple-row'}>
                        <div className={'Couple-bodyText'}>{loremIpsum} </div>
                    </div>
                    <hr/>
                </div>
            </div>
        );
    }
}