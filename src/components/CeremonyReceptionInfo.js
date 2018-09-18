import React, {Component} from 'react';
import {holyRosaryLink, mcmenaminsLink} from '../constants/website-links';
import church from '../assets/graphics/church.png';
import cake from '../assets/graphics/cake.png';

export default class CeremonyReceptionInfo extends Component {
    render() {
        return (
            <div>
                <div className={'row spaceBetween'}>
                    <div className={'Home-informationTextWrapper column'}>
                        <p className={'Home-headerText'}> {'THE CEREMONY'}</p>
                        <p className={'Home-locationText'}> {'Holy Rosary Church'}</p>
                        <p> {'May 28th, 2019 at 2PM'}</p>
                        <a href={holyRosaryLink} target={'_blank'}>
                            <p> {'375 NE Clackamas St. Portland, OR 97232'}</p></a>
                    </div>
                    <div className={'Home-logoWrapper row'}>
                        <img
                            alt={''}
                            className={'Home-logo'}
                            src={church}
                        />
                        <span className={'Home-topRightBorder'}/>
                    </div>
                </div>
                <div className={'row spaceBetween'}>
                    <div className={'Home-logoWrapper row'}>
                        <img
                            alt={''}
                            className={'Home-logo'}
                            src={cake}
                        />
                    </div>
                    <div
                        className={'Home-informationTextWrapper column right'}
                        style={{textAlign: 'right'}}
                    >
                        <p className={'Home-headerText'}>
                            {'THE RECEPTION'}
                        </p>
                        <p className={'Home-locationText'}>{'MCMENAMIN\'S CORNELIUS PASS'}</p>
                        <p>{'May 28th, 2019 at 3:30PM'}</p>
                        <a href={mcmenaminsLink} target={'_blank'}>
                            <p>{'4045 NE Cornelius Pass Rd. Hillsboro, OR 97124'}</p>
                        </a>
                        <span className={'Home-bottomRightBorder'}/>
                    </div>
                </div>
                <span className={'Home-leftBorder'}/>
            </div>
        );
    }
}