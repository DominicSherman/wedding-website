import React, {Component} from 'react';

export default class WeddingBeginsIn extends Component {
    calculateDaysLeft = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const weddingDay = new Date("2019-05-28T14:00:00-07:00").getTime();
        const now = Date.now();

        return Math.floor(Math.abs((weddingDay - now) / (oneDay)));
    };

    render() {
        return (
            <div className={'Home-countdown column spaceBetween'}>
                <div className={'Home-weddingBegins'}>
                    <p className={'Home-weddingBeginsText'}>{'Wedding begins in'}</p>
                </div>
                <div className={'Home-daysLeft'}>
                    <p className={'Home-daysLeftText'}>{`${this.calculateDaysLeft()} DAYS`}</p>
                </div>
            </div>
        );
    }
}