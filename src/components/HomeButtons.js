import React, {Component} from 'react';
import leftGraphic from '../assets/graphics/rsvpleft.png';
import rightGraphic from '../assets/graphics/rsvpright.png';
import * as ActionCreators from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../scss/components/HomeButtons.scss';
import '../scss/Buttons.scss';

class HomeButtons extends Component {
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
                <button className={'Buttons-mediumFont'}>{'Download the App'}</button>
                <img
                    alt={''}
                    className={'HomeButtons-graphics'}
                    src={rightGraphic}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

export default connect(null, mapDispatchToProps)(HomeButtons)