import React, {Component} from 'react';

import '../css/components/WeddingBeginsIn.css';

export default class WeddingBeginsIn extends Component {
    calculateDaysLeft = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const weddingDay = new Date("2019-05-28T14:00:00-07:00").getTime();
        const now = Date.now();

        return Math.floor(Math.abs((weddingDay - now) / (oneDay)));
    };

    render() {
        return (
            <div className={'WeddingBeginsIn-wrapper column spaceBetween'}>
                <div className={'WeddingBeginsIn-weddingBegins'}>
                    <p className={'WeddingBeginsIn-weddingBeginsText'}>{'Wedding begins in'}</p>
                </div>
                <div className={'WeddingBeginsIn-daysLeft'}>
                    <p className={'WeddingBeginsIn-daysLeftText'}>{`${this.calculateDaysLeft()} DAYS`}</p>
                </div>
            </div>
        );
    }
}