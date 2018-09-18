import React, {Component} from 'react';
import leftGraphic from '../assets/graphics/rsvpleft.png';
import rightGraphic from '../assets/graphics/rsvpright.png';
import RSVPModal from './RSVPModal';

export default class HomeButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        };
    }

    setModalVisible = (modalVisible) => this.setState({modalVisible});

    render() {
        console.log('this.state', this.state);
        return (
            <div className={'Home-buttons row spaceBetween'}>
                <img
                    alt={''}
                    className={'Home-rsvpGraphic'}
                    src={leftGraphic}
                />
                <button
                    className={'Home-button'}
                    onClick={() => this.setModalVisible(true)}
                >
                    {'RSVP'}
                </button>
                <button className={'Home-button2'}>{'Download the App'}</button>
                <img
                    alt={''}
                    className={'Home-rsvpGraphic'}
                    src={rightGraphic}
                />
                <RSVPModal
                    setModalVisible={this.setModalVisible}
                    modalVisible={this.state.modalVisible}
                />
            </div>
        );
    }
}