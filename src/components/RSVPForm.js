import React, {Component} from 'react';
import {insertRSVP} from '../services/firebase-service';

import '../css/components/RSVPForm.css';
import '../css/Buttons.css';
import {sendEmail} from '../services/email-service';
import {getIsMobile} from '../constants/service';

export default class RSVPForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            error: '',
            name: '',
            numberInParty: ''
        };

        this.state = this.initialState;
    }

    resetState = () => this.setState(this.initialState);

    setName = (name) => this.setState({name});

    setNumInParty = (numberInParty) => this.setState({numberInParty});

    setError = (error) => this.setState({error});

    validateNumberInParty = () => {
        const n = Math.floor(Number(this.state.numberInParty));

        return n !== Infinity && n > 0;
    };

    submissionIsValid = () => this.state.name !== '' && this.state.numberInParty !== '' && this.validateNumberInParty();

    handleSubmit = () => {
        if (this.submissionIsValid()) {
            insertRSVP(this.state.name, this.state.numberInParty, this.props.env);
            sendEmail(this.state.name, this.state.numberInParty, this.props.count, this.props.env);
            this.resetState();
            this.props.toggleFormVisible();
        } else {
            if (this.state.name === '') {
                this.setError('Must enter a name.');
            } else if (this.state.numberInParty === '') {
                this.setError('Must enter a number in party.');
            } else if (!this.validateNumberInParty()) {
                this.setError('Number in party must be an integer.')
            }
        }
    };

    render() {
        return (
            <div className={'RSVPForm-wrapper column center'}>
                <div className={'RSVPForm-headerText row center'}>
                    <p>
                        {'Please include your first and last name. If you make a mistake or are unable to come, please contact us at '}
                        <a href={'mailto:dominic.sherman98@gmail.com'}>{'dominic.sherman98@gmail.com'}</a>
                    </p>
                </div>
                <div className={'RSVPForm-inputWrapper column spaceBetween'}>
                    <div className={'RSVPForm-singleInputWrapper center'}>
                        <input
                            type={'text'}
                            value={this.state.name}
                            onChange={(event) => this.setName(event.target.value)}
                            placeholder={'Name'}
                            style={getIsMobile() ? {
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
                            style={getIsMobile() ? {
                                maxWidth: '500px',
                                boxSizing: 'border-box',
                                fontSize: 8
                            } : {}}
                        />
                    </div>
                    <div className={'RSVPForm-headerText row center bold'}>
                        <a style={{color: 'red'}}>{this.state.error}</a>
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