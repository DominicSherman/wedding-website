import React, {Component} from 'react';
import logo from '../assets/graphics/D&M-logo.png';
import oregonMark from '../assets/graphics/Oregon-mark.png';
import ringMark from '../assets/graphics/Ring-mark.png';
import '../css/components/Footer.css';

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