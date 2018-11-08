import React, {Component} from 'react';
import leftGraphic from '../assets/graphics/rsvpleft.png';
import rightGraphic from '../assets/graphics/rsvpright.png';

import '../css/components/HomeButtons.css';
import '../css/Buttons.css';
import {openAppLink} from '../services/service';

export default class HomeButtons extends Component {
    render() {
        return (
            <div className={'HomeButtons-wrapper row spaceBetween'}>
                <img
                    alt={''}
                    className={'HomeButtons-graphics'}
                    src={leftGraphic}
                />
                <button
                    className={'Buttons-largeFont'}
                    onClick={this.props.actions.toggleRSVPModal}
                >
                    {'RSVP'}
                </button>
                <button
                    className={'Buttons-mediumFont'}
                    onClick={openAppLink}
                >
                    {'Download the App'}
                </button>
                <img
                    alt={''}
                    className={'HomeButtons-graphics'}
                    src={rightGraphic}
                />
            </div>
        );
    }
};