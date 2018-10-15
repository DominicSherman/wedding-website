import React, {Component} from 'react';
import {insertRSVP} from '../services/firebase-service';

import '../scss/components/RSVPForm.scss';
import '../scss/Buttons.scss';

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

    handleSubmit = async (event) => {
        event.preventDefault();
        await insertRSVP(this.state.name, this.state.numberInParty, this.props.env);
        this.resetState();
    };

    render() {
        return (
            <div>
                <button className={'Buttons-smallFont'} onClick={this.props.toggleFormVisible}>{'View RSVPs'}</button>
                <form onSubmit={this.handleSubmit}>
                    <div className={'column center'}>
                        <div className={'RSVPForm spaceBetween'}>
                            <a>{'Name: '}</a>
                            <input
                                type={'text'}
                                value={this.state.name}
                                onChange={(event) => this.setState({name: event.target.value})}
                            />
                        </div>
                        <div className={'RSVPForm spaceBetween'}>
                            <a>{'# in Party:'}</a>
                            <input
                                type={'text'}
                                value={this.state.numberInParty}
                                onChange={(event) => this.setState({numberInParty: event.target.value})}
                            />
                        </div>
                        <div className={'RSVPForm center'}>
                            <button type={'submit'} className={'Buttons-mediumFont'}>{'SUBMIT'}</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}