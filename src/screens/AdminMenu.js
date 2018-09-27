import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import Switch from 'react-switch';
import '../css/AdminMenu.css';
import {PROD} from '../constants/constants';

export default class AdminMenu extends Component {
    render() {
        const {actions, config, modalVisible} = this.props;

        return (
            <Modal
                classNames={{overlay: 'Home-overlay', modal: 'Home-modal'}}
                open={modalVisible}
                onClose={actions.toggleAdminMenu}
                closeOnOverlayClick={false}
            >
                <div className={'row center'}>
                    <div className={'AdminMenu-wrapper row'}>
                        <p className={'AdminMenu-text'}>{'prod?'}</p>
                        <div>
                            <Switch
                                checked={config.env === PROD}
                                onChange={actions.toggleEnv}
                                uncheckedIcon={false}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

