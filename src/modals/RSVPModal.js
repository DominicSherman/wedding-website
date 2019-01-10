import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import RSVPForm from '../components/RSVPForm';
import RSVPView from '../components/RSVPView';

import '../css/modals/RSVPModal.css';

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
                    closeIcon: 'RSVPModal-closeIcon',
                    overlay: 'RSVPModal-Overlay',
                    modal: 'RSVPModal-Modal'
                }}
                open={modalVisible}
                onClose={actions.toggleRSVPModal}
            >
                {
                    this.state.formVisible ?
                        <RSVPForm
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