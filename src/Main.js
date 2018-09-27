import React, {Component} from 'react';

import headerImage from './assets/header.jpg';
import './css/HeaderImage.css';
import './css/Flex.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Routing from './Routing';
import {withRouter} from 'react-router-dom';
import {initializeFirebase} from './services/firebase-service';
import ModalContainer from './modals/ModalContainer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as ActionCreators from './actions';

let headerImageRef;

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSticky: false,
            presses: 0
        };
    }

    componentWillMount() {
        initializeFirebase();
    }

    componentDidMount() {
        headerImageRef = document.getElementById('headerImageWrapper');
        window.addEventListener('scroll', () => {
            if (window.scrollY > headerImageRef.clientHeight && !this.state.isSticky) {
                this.setState({isSticky: true});
            } else if (window.scrollY < headerImageRef.clientHeight && this.state.isSticky) {
                this.setState({isSticky: false});
            }

        });

        this.props.actions.setRSVPData();
        this.props.actions.setPictures();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            window.scrollTo({
                top: headerImageRef.clientHeight,
                behavior: 'smooth'
            });
        }

        if (this.state.presses === 1 && (prevProps !== this.props)) {
            setTimeout(() => this.setState({presses: 1}),
                5000);
        }

        if (this.state.presses === 10) {
            this.props.actions.toggleAdminMenu();
            this.resetPresses();
        }

        if (prevProps.config.env !== this.props.config.env) {
            console.log('here');
            this.props.actions.setRSVPData();
            this.props.actions.setPictures();
        }
    }

    incrementPresses = () => this.setState({presses: this.state.presses + 1});

    resetPresses = () => this.setState({presses: 0});

    render() {
        return (
            <div>
                <div
                    id={'headerImageWrapper'}
                    className={'HeaderImage-wrapper'}
                    onClick={this.incrementPresses}
                >
                    <img
                        alt=''
                        className={'HeaderImage-image'}
                        src={headerImage}
                    />
                </div>
                <NavBar isSticky={this.state.isSticky}/>
                <Routing isSticky={this.state.isSticky}/>
                <Footer/>
                <ModalContainer
                    presses={this.state.presses}
                    {...this.props}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(ActionCreators, dispatch)});

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));