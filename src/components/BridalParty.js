import React, {Component} from 'react';

import {groomsmen} from '../assets/bridal-party';
import '../css/BridalParty.css';
import Person from "./Person";

export default class BridalParty extends Component {
    render() {
        const GroomsmenDisplay = () => groomsmen.map((g) => <Person info={g}/>);

        return (
            <div>
                <div className={'groomsmen'}>
                    <GroomsmenDisplay/>
                </div>
            </div>
        );
    }
}