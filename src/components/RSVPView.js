import React, {Component} from 'react';

import '../css/Buttons.css';

export default class RSVPView extends Component {
    render() {
        const {data, count} = this.props;

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
            <div>
                <button className={'Buttons-smallFont'} onClick={this.props.toggleFormVisible}>{'View Form'}</button>
                <div className={'row center'}>
                    <h2>{`Total RSVPs: ${count}`}</h2>
                </div>
                < hr
                    className={'RSVPView-divider'}
                    noshade="true"
                />
                <div className={'RSVPView-body row spaceBetween'}>
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
            </div>
        );
    }
}