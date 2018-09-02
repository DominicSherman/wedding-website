import React, {Component} from 'react';

import '../css/Person.css';

export default class Person extends Component {
    render() {
        const {info} = this.props;

        return (
            <div>
                <img
                    className={'image'}
                    src={info.image}
                />
                <p>{`${info.name}`}</p>
                <p>{`${info.role}`}</p>
                <p>{`${info.relation}`}</p>
                <p>{`${info.bio}`}</p>
            </div>
        );
    }
}