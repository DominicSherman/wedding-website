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
                <div className={'AdminMenu-wrapper column spaceBetween'}>
                    <div className={'AdminMenu-wrapper row'}>
                        <p className={'AdminMenu-text'}>{'dev'}</p>
                        <Switch
                            checked={config.env === PROD}
                            onChange={actions.toggleEnv}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            offColor={'#f00'}
                        />
                        <p className={'AdminMenu-text'}>{'prod'}</p>
                    </div>
                    <div className={'AdminMenu-wrapper row'}>
                        <p className={'AdminMenu-text'}>{'Show pictures?'}</p>
                        <Switch
                            checked={config.picturesVisible}
                            onChange={actions.togglePicturesVisible}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

