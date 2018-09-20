import React, {Component} from 'react';
import {getRSVPData} from '../services/firebase-service';
import Modal from 'react-responsive-modal';
import '../css/RSVPInformation.css';

export default class RSVPInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            totalRSVPs: 0
        };
    }

    componentDidMount() {
        const dataRef = getRSVPData();
        dataRef.on('value', (snapshot) => {
            const dataObject = snapshot.val();
            const data = Object.keys(dataObject).map((key) => dataObject[key]);

            if (data) {
                data.sort((a, b) => a.date < b.date ? 1 : -1);
                const totalRSVPs = data.reduce((accum, item) => accum + item.numberInParty, 0);

                this.setState({data});
                this.setState({totalRSVPs});
            }
        });
    }


    render() {
        const {data} = this.state;

        const renderedNames = Object.keys(data).map((key) =>
            <p key={key}>{data[key].name}</p>
        );

        const renderedNumbers = Object.keys(data).map((key) =>
            <p key={key}>{data[key].numberInParty}</p>
        );

        const renderedDates = Object.keys(data).map((key) =>
            <p key={key}>{data[key].date}</p>
        );

        return (
            <Modal
                classNames={{overlay: 'RSVP-overlay', modal: 'RSVP-modal'}}
                open={this.props.presses === 10}
                onClose={this.props.resetPresses}
                closeOnOverlayClick={false}
            >
                <div className={'RSVP-header row center'}>
                    <h2>{`Total RSVPs: ${this.state.totalRSVPs}`}</h2>
                </div>
                <hr
                    className={'RSVP-divider'}
                    noshade="true"
                />
                <div className={'RSVP-body row spaceBetween'}>
                    <div className={'column spaceEvenly'}>
                        <h3>{'Name'}</h3>
                        {renderedNames}
                    </div>
                    <div className={'column spaceEvenly'}>
                        <h3>{'Number in Party'}</h3>
                        {renderedNumbers}
                    </div>
                    <div className={'column spaceEvenly'}>
                        <h3>{'RSVP Date'}</h3>
                        {renderedDates}
                    </div>
                </div>
            </Modal>
        );
    }
}