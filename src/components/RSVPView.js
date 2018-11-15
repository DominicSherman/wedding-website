import React, {Component} from 'react';

import '../css/Buttons.css';
import '../css/components/RSVPView.css';

export default class RSVPView extends Component {
    render() {
        const {data, count, toggleFormVisible} = this.props;

        const renderedNames = data.map((item, index) =>
            <p key={index}>{item.name}</p>
        );

        const renderedNumbers = data.map((item, index) =>
            <p key={index}>{item.numberInParty}</p>
        );

        const renderedDates = data.map((item, index) =>
            <p key={index}>{item.date}</p>
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
                {
                    data.length ?
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
                        :
                        <div className={'row center'}>
                            <p>{'No RSVPs yet'}</p>
                        </div>
                }
            </div>
        );
    }
}