import React, {Component} from 'react';

import {bridesmaids, groomsmen} from '../constants/bridal-party';
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
                <Column className={'BridalParty-groomsmen'}>
                    <GroomsmenDisplay/>
                </Column>
                <Column className={'BridalParty-bridesmaids'}>
                    <BridesmaidDisplay/>
                </Column>
            </div>
        );
    }
}