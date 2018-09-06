import React, {Component} from 'react';

import '../css/Home.css';
import {holyRosaryLink} from '../constants/website-links';

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
        const {isSticky} = this.props;

        return (
            <div
                className={'Home-body'}
                style={{paddingTop: isSticky ? '6%' : '2%'}}
            >
                <div className={'Home-ceremony'}>
                    <p className={'Home-ceremonyText'}>{'CEREMONY'}</p>
                    <p>{'Holy Rosary Church'}</p>
                    <p>{'May 28th, 2019 at 2PM'}</p>
                    <a href={holyRosaryLink} target={'_blank'}>
                        <p>{'375 NE Clackamas St. Portland, OR 97232'}</p>
                    </a>
                </div>
                <div className={'Home-daysLeft'}>
                    <div className={'Home-weddingBegins'}>
                    <p className={'Home-weddingBeginsText'}>{'Wedding begins in'}</p>
                    </div>
                    <div className={'Home-days'}>
                        <p className={'Home-daysText'}>{`${this.state.days} DAYS`}</p>
                    </div>
                </div>
            </div>
        );
    }
}
