import React, {Component} from 'react';

import '../css/Home.css';
import {holyRosaryLink} from "../constants/website-links";

export default class Home extends Component {
    render() {
        const {isSticky} = this.props;

        return (
            <div
                className={"Home-body"}
                style={{paddingTop: isSticky ? '6%' : '2%'}}
            >
                <div className={'Home-ceremony'}>
                    <p
                        style={{
                            fontSize: '25px',
                            fontFamily: 'Lubalin',
                            color: 'lightblue',
                            paddingBottom: '1%'
                        }}
                    >
                        {'CEREMONY'}
                    </p>
                    <p>
                        {'Holy Rosary Church'}
                    </p>
                    <p>
                        {'May 28th, 2019 at 2PM'}
                    </p>
                    <a href={holyRosaryLink} target={'_blank'}>
                        <p>
                            {'375 NE Clackamas St. Portland, OR 97232'}
                        </p>
                    </a>
                </div>
            </div>
        );
    }
}
