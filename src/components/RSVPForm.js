import React, {Component} from 'react';
import {insertRSVP} from '../services/firebase-service';

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
                <button className={'Home-button3'} onClick={this.props.toggleFormVisible}>{'View RSVPs'}</button>
                <form onSubmit={this.handleSubmit}>
                    <div className={'column center'}>
                        <div className={'Home-formRow row spaceBetween'}>
                            <a>{'Name: '}</a>
                            <input
                                type={'text'}
                                value={this.state.name}
                                onChange={(event) => this.setState({name: event.target.value})}
                            />
                        </div>
                        <div className={'Home-formRow row spaceBetween'}>
                            <a>{'# in Party:'}</a>
                            <input
                                type={'text'}
                                value={this.state.numberInParty}
                                onChange={(event) => this.setState({numberInParty: event.target.value})}
                            />
                        </div>
                        <div className={'Home-formRow row center'}>
                            <button type={'submit'} className={'Home-button2'}>{'SUBMIT'}</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}