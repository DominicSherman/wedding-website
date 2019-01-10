import React, {Component} from 'react';
import {insertRSVP} from '../services/firebase-service';

import '../css/components/RSVPForm.css';
import '../css/Buttons.css';

export default class RSVPForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
            numberInParty: '',
            namePlaceholderVisible: true,
            numberInPartyPlaceholderVisible: true
        };

        this.state = this.initialState;
    }

    resetState = () => this.setState(this.initialState);

    setName = (name) => this.setState({name});

    setNumInParty = (numberInParty) => this.setState({numberInParty});

    setNamePlaceholderVisible = (namePlaceholderVisible) => this.setState({namePlaceholderVisible});

    setNumberInPartyPlaceholderVisible = (numberInPartyPlaceholderVisible) => this.setState({numberInPartyPlaceholderVisible});

    handleSubmit = async () => {
        if (this.state.name !== '' && this.state.numberInParty !== '') {
            await insertRSVP(this.state.name, this.state.numberInParty, this.props.env);
            this.resetState();
            this.props.toggleFormVisible();
        }
    };

    render() {
        return (
            <div className={'RSVPForm-wrapper column center'}>
                <div className={'RSVPForm-inputWrapper column spaceBetween'}>
                    <div className={'RSVPForm-singleInputWrapper center'}>
                        {
                            this.state.namePlaceholderVisible &&
                            <p className={'RSVPForm-label'}>{'Name'}</p>
                        }
                        <input
                            type={'text'}
                            value={this.state.name}
                            onChange={(event) => this.setName(event.target.value)}
                            onFocus={() => this.setNamePlaceholderVisible(false)}
                            onBlur={() => {
                                if (this.state.name === '') {
                                    this.setNamePlaceholderVisible(true);
                                }
                            }}
                        />
                    </div>
                    <div className={'RSVPForm-singleInputWrapper center'}>
                        {
                            this.state.numberInPartyPlaceholderVisible &&
                            <p className={'RSVPForm-label'}>{'Number in party'}</p>
                        }
                        <input
                            type={'text'}
                            value={this.state.numberInParty}
                            onChange={(event) => this.setNumInParty(event.target.value)}
                            onFocus={() => this.setNumberInPartyPlaceholderVisible(false)}
                            onBlur={() => {
                                if (this.state.numberInParty === '') {
                                    this.setNumberInPartyPlaceholderVisible(true);
                                }
                            }}
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