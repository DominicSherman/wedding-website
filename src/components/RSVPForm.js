import React, {Component} from 'react';
import {insertRSVP} from '../services/firebase-service';
import {isMobile} from 'react-device-detect';

import '../css/components/RSVPForm.css';
import '../css/Buttons.css';
import {sendEmail} from '../services/email-service';

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

    handleSubmit = () => {
        if (this.state.name !== '' && this.state.numberInParty !== '') {
            insertRSVP(this.state.name, this.state.numberInParty, this.props.env);
            sendEmail(this.state.name, this.state.numberInParty, this.props.count, this.props.env);
            this.resetState();
            this.props.toggleFormVisible();
        }
    };

    render() {
        return (
            <div className={'RSVPForm-wrapper column center'}>
                <div className={'RSVPForm-inputWrapper column spaceBetween'}>
                    <div className={'RSVPForm-singleInputWrapper center'}>
                        <input
                            type={'text'}
                            value={this.state.name}
                            onChange={(event) => this.setName(event.target.value)}
                            placeholder={'Name'}
                            style={isMobile ? {
                                maxWidth: '500px',
                                boxSizing: 'border-box',
                                fontSize: 8
                            } : {}}
                        />
                    </div>
                    <div className={'RSVPForm-singleInputWrapper center'}>
                        <input
                            type={'text'}
                            value={this.state.numberInParty}
                            onChange={(event) => this.setNumInParty(event.target.value)}
                            placeholder={'Number in party'}
                            style={isMobile ? {
                                maxWidth: '500px',
                                boxSizing: 'border-box',
                                fontSize: 8
                            } : {}}
                        />
                    </div>
                </div>
                <div className={'RSVPForm spaceEvenly'}>
                    <button
                        type={'submit'}
                        onClick={this.handleSubmit}
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
        );
    }
}