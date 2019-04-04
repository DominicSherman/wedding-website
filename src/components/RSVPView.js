import React, {Component} from 'react';

import '../css/Buttons.css';
import '../css/components/RSVPView.css';

export default class RSVPView extends Component {
    render() {
        const {data, count, toggleFormVisible} = this.props;

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
                        <div className={'RSVPView-wrapper column spaceEvenly'}>
                            {
                                data.map((item, index) =>
                                    <p
                                        className={'RSVPView-text'}
                                        key={index}
                                    >
                                        {`${item.name} (${item.numberInParty})`}
                                    </p>
                                )
                            }
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