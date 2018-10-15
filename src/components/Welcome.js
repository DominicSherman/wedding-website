import React, {Component} from 'react';
import bells from '../assets/graphics/weddingsbells.png';
import '../css/components/Welcome.css';

export default class Welcome extends Component {
    render() {
        return (
            <div className={'Welcome-wrapper column'}>
                <div className={'row spaceBetween'}>
                    <div className={'column'}>
                        <p className={'Welcome-headerText'}>{'Welcome to our website!'}</p>
                        <p><b>{'Greetings from Dominic and Mary!'}</b></p>
                    </div>
                    <img
                        alt={''}
                        className={'Welcome-bells'}
                        src={bells}
                    />
                    <span className={'Welcome-bellBorder'}/>
                </div>
                <p>{'You can find information about the wedding, get directions, and RSVP. After the day, pictures uploaded using the app will be viewable in the pictures tab.'}</p>
            </div>
        );
    }
}