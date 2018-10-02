import React, {Component} from 'react';
import {holyRosaryLink, mcmenaminsLink} from '../constants/constants';
import church from '../assets/graphics/church.png';
import cake from '../assets/graphics/cake.png';

import '../css/components/HomeInfo.css';

export default class HomeInfo extends Component {
    render() {
        return (
            <div>
                <div className={'row spaceBetween'}>
                    <div className={'HomeInfo-informationTextWrapper column'}>
                        <p className={'HomeInfo-headerText'}> {'THE CEREMONY'}</p>
                        <p className={'HomeInfo-locationText'}> {'Holy Rosary Church'}</p>
                        <p> {'May 28th, 2019 at 2PM'}</p>
                        <a href={holyRosaryLink} target={'_blank'}>
                            <p> {'375 NE Clackamas St. Portland, OR 97232'}</p></a>
                    </div>
                    <div className={'HomeInfo-logoWrapper row'}>
                        <img
                            alt={''}
                            className={'HomeInfo-logo'}
                            src={church}
                        />
                        <span className={'HomeInfo-topRightBorder'}/>
                    </div>
                </div>
                <div className={'row spaceBetween'}>
                    <div className={'HomeInfo-logoWrapper row'}>
                        <img
                            alt={''}
                            className={'HomeInfo-logo'}
                            src={cake}
                        />
                    </div>
                    <div
                        className={'HomeInfo-informationTextWrapper column right'}
                        style={{textAlign: 'right'}}
                    >
                        <p className={'HomeInfo-headerText'}>
                            {'THE RECEPTION'}
                        </p>
                        <p className={'HomeInfo-locationText'}>{'MCMENAMIN\'S CORNELIUS PASS'}</p>
                        <p>{'May 28th, 2019 at 3:30PM'}</p>
                        <a href={mcmenaminsLink} target={'_blank'}>
                            <p>{'4045 NE Cornelius Pass Rd. Hillsboro, OR 97124'}</p>
                        </a>
                        <span className={'HomeInfo-bottomRightBorder'}/>
                    </div>
                </div>
                <span className={'HomeInfo-leftBorder'}/>
            </div>
        );
    }
}