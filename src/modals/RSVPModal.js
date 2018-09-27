import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import RSVPForm from '../components/RSVPForm';
import RSVPView from '../components/RSVPView';

import '../css/modals/Modals.css';

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
        const {RSVP: {data, count}, env} = this.props;

        return (
            <Modal
                classNames={{overlay: 'Overlay', modal: 'Modal'}}
                open={this.props.modalVisible}
                onClose={this.props.actions.toggleRSVPModal}
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