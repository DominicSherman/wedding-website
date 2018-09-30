import React, {Component} from 'react';

import '../css/screens/Registry.css';
import macy from '../assets/macy.png';
import crate from '../assets/crateandbarrel.png';
import {crateAndBarrelLink, macyLink} from '../constants/website-links';

export default class Registry extends Component {
    render() {
        return (
            <div className={'Registry-wrapper column center'}>
                <p>{'Click on a logo to go to the registry'}</p>
                <div className={'row spaceBetween'}>
                    <div className={'Registry-logoWrapper'}>
                        <a
                            href={macyLink}
                            target={'_blank'}
                        >
                            <img
                                alt={''}
                                className={'Registry-logo'}
                                src={macy}

                            />
                        </a>
                    </div>
                    <div className={'Registry-logoWrapper'}>
                        <a
                            href={crateAndBarrelLink}
                            target={'_blank'}
                        >
                            <img
                                alt={''}
                                className={'Registry-logo'}
                                src={crate}

                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}