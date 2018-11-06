import React, {Component} from 'react';

import '../css/screens/Home.css';
import Welcome from '../components/Welcome';
import WeddingBeginsIn from '../components/WeddingBeginsIn';
import HomeInfo from '../components/HomeInfo';
import HomeButtonsContainer from '../containers/HomeButtonsContainer';
import {setPageViewed} from '../services/analytics-service';

export default class Home extends Component {
    componentDidMount() {
        setPageViewed('home');
    }

    render() {
        return (
            <div className={'column'}>
                <div className={'row'}>
                    <Welcome/>
                    <WeddingBeginsIn/>
                </div>
                <div className={'Home-information column center'}>
                    <HomeInfo/>
                    <HomeButtonsContainer/>
                </div>
            </div>
        );
    }
}
