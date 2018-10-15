import React, {Component} from 'react';

import {bridesmaids, groomsmen} from '../constants/bridal-party';
import Person from '../components/Person';
import '../scss/screens/WeddingParty.scss';

export default class WeddingParty extends Component {
    render() {
        const GroomsmenDisplay = () => groomsmen.map((g) => <Person key={g.name} info={g}/>);
        const BridesmaidDisplay = () => bridesmaids.map((b) => <Person key={b.name} info={b}/>);

        return (
            <div className={'row'}>
                <div className={'WeddingParty-groomsmen column'}>
                    <GroomsmenDisplay/>
                </div>
                <div className={'WeddingParty-bridesmaids column'}>
                    <BridesmaidDisplay/>
                </div>
            </div>
        );
    }
}