import React, {Component} from 'react';
import AdminMenu from './AdminMenu';
import RSVPModal from './RSVPModal';

export default class ModalContainer extends Component {
    render() {
        const {actions, config, adminMenuVisible, rsvpModalVisible, RSVP} = this.props;

        return (
            <div>
                <AdminMenu
                    actions={actions}
                    config={config}
                    modalVisible={adminMenuVisible}
                />
                <RSVPModal
                    actions={actions}
                    env={config.env}
                    RSVP={RSVP}
                    modalVisible={rsvpModalVisible}
                />
            </div>
        );
    }
}