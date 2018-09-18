import React, {Component} from 'react';
import Modal from 'react-responsive-modal';

import {holyRosaryLink, mcmenaminsLink} from '../constants/website-links';
import '../css/Home.css';
import church from '../assets/graphics/church.png';
import cake from '../assets/graphics/cake.png';
import bells from '../assets/graphics/weddingsbells.png';
import leftGraphic from '../assets/graphics/rsvpleft.png';
import rightGraphic from '../assets/graphics/rsvpright.png';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            name: null,
            numberOfGuests: null
        };
    }

    calculateDaysLeft = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const weddingDay = new Date("2019-05-28T14:00:00-07:00").getTime();
        const now = Date.now();

        return Math.floor(Math.abs((weddingDay - now) / (oneDay)));
    };

    render() {
        return (
            <div className={'column'}>
                <div className={'row'}>

                    <div className={'Home-welcome column'}>
                        <div className={'row spaceBetween'}>
                            <div className={'column'}>
                                <p className={'Home-welcomeHeaderText'}>{'Welcome to our website!'}</p>
                                <p><b>{'Greetings from Dominic and Mary!'}</b></p>
                            </div>
                            <img
                                alt={''}
                                className={'Home-bells'}
                                src={bells}
                            />
                            <span className={'Home-bellBorder'}/>
                        </div>
                        <p>{'You can find information about the wedding, get directions, and RSVP. After the day, pictures uploaded using the app will be viewable in the photos tab.'}</p>
                    </div>

                    <div className={'Home-countdown column spaceBetween'}>
                        <div className={'Home-weddingBegins'}>
                            <p className={'Home-weddingBeginsText'}>{'Wedding begins in'}</p>
                        </div>
                        <div className={'Home-daysLeft'}>
                            <p className={'Home-daysLeftText'}>{`${this.calculateDaysLeft()} DAYS`}</p>
                        </div>
                    </div>

                </div>

                <div className={'Home-information column center'}>

                    <div className={'row spaceBetween'}>
                        <div className={'Home-informationTextWrapper column'}>
                            <p className={'Home-headerText'}> {'THE CEREMONY'}</p>
                            <p className={'Home-locationText'}> {'Holy Rosary Church'}</p>
                            <p> {'May 28th, 2019 at 2PM'}</p>
                            <a href={holyRosaryLink} target={'_blank'}>
                                <p> {'375 NE Clackamas St. Portland, OR 97232'}</p></a>
                        </div>
                        <div className={'Home-logoWrapper row'}>
                            <img
                                alt={''}
                                className={'Home-logo'}
                                src={church}
                            />
                            <span className={'Home-topRightBorder'}/>
                        </div>
                    </div>

                    <div className={'row spaceBetween'}>
                        <div className={'Home-logoWrapper row'}>
                            <img
                                alt={''}
                                className={'Home-logo'}
                                src={cake}
                            />
                        </div>
                        <div
                            className={'Home-informationTextWrapper column right'}
                            style={{textAlign: 'right'}}
                        >
                            <p className={'Home-headerText'}>
                                {'THE RECEPTION'}
                            </p>
                            <p className={'Home-locationText'}>{'MCMENAMIN\'S CORNELIUS PASS'}</p>
                            <p>{'May 28th, 2019 at 3:30PM'}</p>
                            <a href={mcmenaminsLink} target={'_blank'}>
                                <p>{'4045 NE Cornelius Pass Rd. Hillsboro, OR 97124'}</p>
                            </a>
                            <span className={'Home-bottomRightBorder'}/>
                        </div>
                    </div>

                    <span className={'Home-leftBorder'}/>

                    <div className={'Home-buttons row spaceBetween'}>
                        <img
                            alt={''}
                            className={'Home-rsvpGraphic'}
                            src={leftGraphic}
                        />
                        <button
                            className={'Home-button'}
                            onClick={() => this.setState({modalVisible: true})}
                        >
                            {'RSVP'}
                        </button>
                        <button className={'Home-button2'}>{'Download the App'}</button>
                        <img
                            alt={''}
                            className={'Home-rsvpGraphic'}
                            src={rightGraphic}
                        />
                    </div>

                    <Modal
                        classNames={{overlay: 'Home-overlay', modal: 'Home-modal'}}
                        open={this.state.modalVisible}
                        onClose={() => this.setState({modalVisible: false})}
                    >
                        <form onSubmit={() => console.log(`SUBMITTED ${this.state.name}`)}>
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
                </div>
            </div>
        );
    }
}
