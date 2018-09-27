import React, {Component} from 'react';
import leftGraphic from '../assets/graphics/rsvpleft.png';
import rightGraphic from '../assets/graphics/rsvpright.png';
import * as ActionCreators from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class HomeButtons extends Component {
    render() {
        return (
            <div className={'Home-buttons row spaceBetween'}>
                <img
                    alt={''}
                    className={'Home-rsvpGraphic'}
                    src={leftGraphic}
                />
                <button
                    className={'Home-button'}
                    onClick={this.props.actions.toggleRSVPModal}
                >
                    {'RSVP'}
                </button>
                <button className={'Home-button2'}>{'Download the App'}</button>
                <img
                    alt={''}
                    className={'Home-rsvpGraphic'}
                    src={rightGraphic}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(HomeButtons)