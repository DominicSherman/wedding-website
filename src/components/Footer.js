import React, {Component} from 'react';
import logo from '../assets/logos/D&M-logo.png';
import oregonMark from '../assets/logos/Oregon-mark.png';
import ringMark from '../assets/logos/Ring-mark.png';
import '../css/Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className={'Footer column'}>
                <div className={'Footer-logoWrapper center'}>
                    <img
                        alt={''}
                        className={'Footer-images'}
                        src={logo}
                    />
                </div>
                <div className={'Footer-marksWrapper spaceEvenly'}>
                    <img
                        alt={''}
                        className={'Footer-images'}
                        src={ringMark}
                    />
                    <img
                        alt={''}
                        className={'Footer-images'}
                        src={oregonMark}
                    />
                </div>
                <p className={'Footer-text center'}>{'Built by Dominic Sherman | Designed by Michael Sherman'}</p>
            </div>
        );
    }
}