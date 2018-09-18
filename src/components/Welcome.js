import React, {Component} from 'react';
import bells from '../assets/graphics/weddingsbells.png';

export default class Welcome extends Component {
    render() {
        return (
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
        );
    }
}