import React, {Component} from 'react';

import {bridesmaids, groomsmen} from '../constants/bridal-party';
import Person from '../components/Person';
import '../css/screens/WeddingParty.css';

export default class WeddingParty extends Component {
    render() {
        return (
            <div className={'row'}>
                <div className={'WeddingParty-groomsmen column'}>
                    {groomsmen.map((g) => <Person key={g.name} info={g}/>)}
                </div>
                <div className={'WeddingParty-bridesmaids column'}>
                    {bridesmaids.map((b) => <Person key={b.name} info={b}/>)}
                </div>
            </div>
        );
    }
}