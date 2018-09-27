import React, {Component} from 'react';

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
                <button className={'Home-button3'} onClick={this.props.toggleFormVisible}>{'View Form'}</button>
                <div className={'RSVP-header row center'}>
                    <h2>{`Total RSVPs: ${count}`}</h2>
                </div>
                < hr
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
            </div>
        );
    }
}