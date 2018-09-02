import React, {Component} from 'react';

import beach from '../assets/images/beach.JPG';
import '../css/Home.css';
import {holyRosaryLink, mcmenaminsLink} from "../assets/website-links";

export default class Home extends Component {
    render() {
        const {isSticky} = this.props;

        return (
            <div
                className={"body"}
                style={{paddingTop: isSticky ? '6%' : '2%'}}
            >
                <div className={'imageDiv'}>
                    <img className={'image'} src={beach} alt=''/>
                </div>
                <div className={'left'}>
                    <h3>
                        {'Ceremony'}
                    </h3>
                    <p>
                        {'Holy Rosary Church'}
                    </p>
                    <p>
                        {'May 28th, 2019 at 2PM'}
                    </p>
                    <a href={holyRosaryLink} target="_blank">
                        <p>
                            {'375 NE Clackamas St'}
                        </p>
                        <p>
                            {'Portland, OR 97232'}
                        </p>
                    </a>
                    <h3 style={{paddingTop: '10%'}}>
                        {'Reception'}
                    </h3>
                    <p>
                        {'McMenamins Cornelius Pass Roadhouse'}
                    </p>
                    <p>
                        {'May 28th, 2019 at 4PM'}
                    </p>
                    <a href={mcmenaminsLink} target="_blank">
                        <p>
                            {'4045 NE Cornelius Pass Rd'}
                        </p>
                        <p>
                            {'Hillsboro, OR 97124'}
                        </p>
                    </a>
                </div>
                <div className={'right'}>
                </div>
            </div>
        );
    }
}
