import React, {Component} from 'react';

import '../css/screens/Registry.css';
import macy from '../assets/registry/macy.png';
import crate from '../assets/registry/crateandbarrel.png';
import target from '../assets/registry/target.png';
import {crateAndBarrelLink, macyLink, targetLink} from '../constants/constants';
import {setPageViewed} from '../services/analytics-service';

export default class Registry extends Component {
    componentDidMount() {
        setPageViewed('registry')
    }

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
                    <div className={'Registry-logoWrapper2'}>
                        <a
                            href={targetLink}
                            target={'_blank'}
                        >
                            <img
                                alt={''}
                                className={'Registry-logo'}
                                src={target}

                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}