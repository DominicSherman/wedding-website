import React, {Component} from 'react';

import {bridesmaids, groomsmen} from '../constants/bridal-party';
import '../css/WeddingParty.css';
import Person from "../components/Person";

export default class WeddingParty extends Component {
    render() {
        const GroomsmenDisplay = () => groomsmen.map((g) => <Person key={g.name} info={g}/>);
        const BridesmaidDisplay = () => bridesmaids.map((b) => <Person key={b.name} info={b}/>);

        return (
            <div className={'WeddingParty-wrapper'}>
                <div className={'WeddingParty-groomsmen'}>
                    <GroomsmenDisplay/>
                </div>
                <div className={'WeddingParty-bridesmaids'}>
                    <BridesmaidDisplay/>
                </div>
            </div>
        );
    }
}