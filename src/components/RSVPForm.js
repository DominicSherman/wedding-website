import React, {Component} from 'react';
import {insertRSVP} from '../services/firebase-service';

import '../css/components/RSVPForm.css';
import '../css/Buttons.css';

export default class RSVPForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
            numberInParty: ''
        };

        this.state = this.initialState;
    }

    resetState = () => this.setState(this.initialState);

    setName = (name) => this.setState({name});

    setNumInParty = (numberInParty) => this.setState({numberInParty});

    handleSubmit = async (event) => {
        event.preventDefault();
        await insertRSVP(this.state.name, this.state.numberInParty, this.props.env);
        this.resetState();
    };

    render() {
        return (
            <div className={'RSVPForm-wrapper'}>
                <form onSubmit={this.handleSubmit}>
                    <div className={'column center'}>
                        <div className={'RSVPForm spaceBetween'}>
                            <b><a>{'Name: '}</a></b>
                            <input
                                type={'text'}
                                value={this.state.name}
                                onChange={(event) => this.setName(event.target.value)}
                            />
                        </div>
                        <div className={'RSVPForm spaceBetween'}>
                            <b><a>{'# in party: '}</a></b>
                            <input
                                type={'text'}
                                value={this.state.numberInParty}
                                onChange={(event) => this.setNumInParty(event.target.value)}
                            />
                        </div>
                        <div className={'RSVPForm spaceEvenly'}>
                            <button
                                type={'submit'}
                                className={'Buttons-mediumFont'}
                            >
                                {'Submit'}
                            </button>
                            <button
                                className={'Buttons-mediumFont RSVPForm-rsvpsButton'}
                                onClick={this.props.toggleFormVisible}
                            >
                                {'View RSVPs'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}