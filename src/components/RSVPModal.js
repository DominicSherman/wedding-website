import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

export default class RSVPModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            numberOfGuests: null
        };
    }

    render() {
        return (
            <Modal
                classNames={{overlay: 'Home-overlay', modal: 'Home-modal'}}
                open={this.props.modalVisible}
                onClose={() => this.props.setModalVisible(false)}
            >
                <form onSubmit={() => {}}>
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
                                value={this.state.numberOfGuests}
                                onChange={(event) => this.setState({numberOfGuests: event.target.value})}
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