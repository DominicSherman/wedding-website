import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {insertRSVP} from '../services/firebase-service';

export default class RSVPModal extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
            numberInParty: '',
            formVisible: true
        };

        this.state = this.initialState;
    }

    resetState = () => this.setState(this.initialState);

    handleSubmit = async (event) => {
        event.preventDefault();
        await insertRSVP(this.state.name, this.state.numberInParty, this.props.env);
        this.resetState();
    };

    toggleFormVisible = () => {
        this.setState({formVisible: !this.state.formVisible})
    };

    render() {
        const {RSVP: {data, count}} = this.props;

        const renderedNames = Object.keys(data).map((key) =>
            <p key={key}>{data[key].name}</p>
        );

        const renderedNumbers = Object.keys(data).map((key) =>
            <p key={key}>{data[key].numberInParty}</p>
        );

        const renderedDates = Object.keys(data).map((key) =>
            <p key={key}>{data[key].date}</p>
        );

        return (
            <Modal
                classNames={{overlay: 'Home-overlay', modal: 'Home-modal'}}
                open={this.props.modalVisible}
                onClose={this.props.actions.toggleRSVPModal}
            >
                {
                    this.state.formVisible ?
                        <div>
                            <button onClick={this.toggleFormVisible}>{'View RSVPs'}</button>
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
                        :
                        <div>
                            <button onClick={this.toggleFormVisible}>{'View Form'}</button>
                            <div className={'RSVP-header row center'}>
                                <h2>{`Total RSVPs: ${count}`}</h2>
                            </div>
                            < hr
                                className={'RSVP-divider'}
                                noshade="true"
                            />
                            <div className={'RSVP-body row spaceBetween'}>
                                <div className={'column spaceEvenly'}>
                                    <h3>{'Name'}</h3>
                                    {renderedNames}
                                </div>
                                <div className={'column spaceEvenly'}>
                                    <h3>{'Number in Party'}</h3>
                                    {renderedNumbers}
                                </div>
                                <div className={'column spaceEvenly'}>
                                    <h3>{'RSVP Date'}</h3>
                                    {renderedDates}
                                </div>
                            </div>
                        </div>
                }
            </Modal>
        );
    }
}