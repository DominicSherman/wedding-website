import React, {Component} from 'react';

import {holyRosaryLink, mcmenaminsLink} from '../constants/website-links';
import '../css/Home.css';
import church from '../assets/graphics/church.png';
import cake from '../assets/graphics/cake.png';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: 0
        };
    }

    componentDidMount() {
        const oneDay = 24 * 60 * 60 * 1000;
        const weddingDay = new Date("2019-05-28T14:00:00-07:00").getTime();
        const now = Date.now();
        const days = Math.floor(Math.abs((weddingDay - now) / (oneDay)));

        this.setState({
            days
        });
    }

    render() {
        return (
            <div className={'column'}>
                <div className={'row'}>
                    <div className={'Home-welcome column'}>
                        <p className={'Home-welcomeHeaderText'}>{'Welcome to our website!'}</p>
                        <p>{'Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. '}</p>
                    </div>
                    <div className={'Home-daysLeft column spaceBetween'}>
                        <div className={'Home-weddingBegins'}>
                            <p className={'Home-weddingBeginsText'}>{'Wedding begins in'}</p>
                        </div>
                        <div className={'Home-days'}>
                            <p className={'Home-daysText'}>{`${this.state.days} DAYS`}</p>
                        </div>
                    </div>
                </div>

                <div className={'Home-information column center'}>
                    <div className={'row spaceBetween'}>
                        <div className={'Home-informationTextWrapper column'}>
                            <p className={'Home-informationHeaderText'}>{'THE CEREMONY'}</p>
                            <p className={'Home-locationText'}>{'Holy Rosary Church'}</p>
                            <p>{'May 28th, 2019 at 2PM'}</p>
                            <a href={holyRosaryLink} target={'_blank'}>
                                <p>{'375 NE Clackamas St. Portland, OR 97232'}</p>
                            </a>
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
                    <span className={'Home-leftBorder'}/>
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
                            <p className={'Home-informationHeaderText'}>
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
                </div>
            </div>
        );
    }
}
