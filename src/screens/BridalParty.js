import React, {Component} from 'react';

import {bridesmaids, groomsmen} from '../assets/bridal-party';
import '../css/BridalParty.css';
import Person from "../components/Person";
import {Column} from "simple-flexbox";

export default class BridalParty extends Component {
    render() {
        const {isSticky} = this.props;
        const GroomsmenDisplay = () => groomsmen.map((g) => <Person key={g.name} info={g}/>);
        const BridesmaidDisplay = () => bridesmaids.map((b) => <Person key={b.name} info={b}/>);

        return (
            <div style={{paddingTop: isSticky ? '6%' : '2%'}}>
                <Column className={'groomsmen'}>
                    <GroomsmenDisplay/>
                </Column>
                <Column className={'bridesmaids'}>
                    <BridesmaidDisplay/>
                </Column>
            </div>
        );
    }
}