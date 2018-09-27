import React, {Component} from 'react';

import '../css/screens/Home.css';
import Welcome from '../components/Welcome';
import WeddingBeginsIn from '../components/WeddingBeginsIn';
import HomeInfo from '../components/HomeInfo';
import HomeButtons from '../components/HomeButtons';

export default class Home extends Component {
    render() {
        return (
            <div className={'column'}>
                <div className={'row'}>
                    <Welcome/>
                    <WeddingBeginsIn/>
                </div>
                <div className={'Home-information column center'}>
                    <HomeInfo/>
                    <HomeButtons/>
                </div>
            </div>
        );
    }
}
