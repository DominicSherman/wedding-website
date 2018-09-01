import React, {Component} from 'react';
import capitol from '../assets/capitol.jpg';
import '../css/Home.css';
import headerImage from '../assets/header.png';
import Header from "./Header";

export default class Home extends Component {
    state = {
        isSticky: false
    };

    componentDidMount() {
        const headerImage = document.getElementById('headerImage');
        window.addEventListener('scroll', () => this.setState({isSticky: window.scrollY > headerImage.clientHeight}));
    }

    render() {
        return (
            <div>
                <img
                    alt=''
                    className={'headerImage'}
                    id={'headerImage'}
                    src={headerImage}
                />
                <Header isSticky={this.state.isSticky}/>
                <div className={"body"} style={{
                    paddingTop: this.state.isSticky ? '6%' : null
                }}>
                    <div className={'imageDiv'}>
                        <img className={'image'} src={capitol} alt=''/>
                    </div>
                    <div className={'left'}>
                        <h3>
                            {'Ceremony'}
                        </h3>
                        <p>
                            {'May 28th, 2019 at 2PM'}
                        </p>
                        <p>
                            {'Holy Rosary Church'}
                        </p>
                    </div>
                    <div className={'right'}>
                        <h3>
                            {'Reception'}
                        </h3>
                        <p>
                            {'McMenamins'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
