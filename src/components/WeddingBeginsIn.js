import React, {Component} from 'react';

import '../css/components/WeddingBeginsIn.css';
import {calculateDaysLeft} from '../constants/service';

export default class WeddingBeginsIn extends Component {
    render() {
        return (
            <div className={'WeddingBeginsIn-wrapper column spaceBetween'}>
                <div className={'WeddingBeginsIn-weddingBegins'}>
                    <p className={'WeddingBeginsIn-weddingBeginsText'}>{'Wedding begins in'}</p>
                </div>
                <div className={'WeddingBeginsIn-daysLeft'}>
                    <p className={'WeddingBeginsIn-daysLeftText'}>{`${calculateDaysLeft()} DAYS`}</p>
                </div>
            </div>
        );
    }
}