import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import RSVPForm from '../components/RSVPForm';
import RSVPView from '../components/RSVPView';

import '../css/modals/RSVPModal.css';
import {getIsMobile} from '../constants/service';

export default class RSVPModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formVisible: true
        };
    }

    toggleFormVisible = () => {
        this.setState({formVisible: !this.state.formVisible})
    };

    render() {
        const {actions, RSVP: {data, count}, env, modalVisible} = this.props;

        return (
            <Modal
                classNames={{
                    closeButton: 'RSVPModal-closeButton',
                    overlay: 'RSVPModal-Overlay',
                    modal: 'RSVPModal-Modal'
                }}
                closeIconSize={getIsMobile() ? 10 : 28}
                open={modalVisible}
                onClose={actions.toggleRSVPModal}
            >
                {
                    this.state.formVisible ?
                        <RSVPForm
                            count={count}
                            env={env}
                            toggleFormVisible={this.toggleFormVisible}
                        />
                        :
                        <RSVPView
                            data={data}
                            count={count}
                            toggleFormVisible={this.toggleFormVisible}
                        />
                }
            </Modal>
        );
    }
}