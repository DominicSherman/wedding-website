import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {insertRSVP} from '../services/firebase-service';

export default class RSVPModal extends Component {
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
        await insertRSVP(this.state.name, this.state.numberInParty);
        this.resetState();
        this.props.setModalVisible(false);
    };

    render() {
        return (
            <Modal
                classNames={{overlay: 'Home-overlay', modal: 'Home-modal'}}
                open={this.props.modalVisible}
                onClose={() => this.props.setModalVisible(false)}
            >
                <button>{'View RSVPs'}</button>
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
            </Modal>
        );
    }
}