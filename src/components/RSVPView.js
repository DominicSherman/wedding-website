import React, {Component} from 'react';

import '../css/Buttons.css';
import '../css/components/RSVPView.css';

export default class RSVPView extends Component {
    render() {
        const {data, count, toggleFormVisible} = this.props;

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
                <div className={'RSVPView-header row spaceBetween'}>
                    <h2>{`Total RSVPs: ${count}`}</h2>
                    <button
                        className={'Buttons-smallFont RSVPView-button'}
                        onClick={toggleFormVisible}
                    >
                        {'View Form'}
                    </button>
                </div>
                <hr
                    className={'RSVPView-divider'}
                    noshade="true"
                />
                <div className={'RSVPView-body row spaceBetween'}>
                    <div className={'column spaceEvenly'}>
                        <h3 className={'RSVPView-headerText'}>{'Name'}</h3>
                        {renderedNames}
                    </div>
                    <div className={'column spaceEvenly'}>
                        <h3 className={'RSVPView-headerText'}>{'Number in Party'}</h3>
                        {renderedNumbers}
                    </div>
                    <div className={'column spaceEvenly'}>
                        <h3 className={'RSVPView-headerText'}>{'RSVP Date'}</h3>
                        {renderedDates}
                    </div>
                </div>
            </div>
        );
    }
}