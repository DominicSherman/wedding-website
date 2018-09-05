import React, {Component} from 'react';

export default class TimeLeft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: 0
        };
    }

    componentDidMount() {
        const oneDay = 24 * 60 * 60 * 1000;
        const weddingDay = new Date("2019-05-28T14:00:00-07:00").getTime();
        const now = Date.now();
        const days = Math.floor(Math.abs((weddingDay - now) / (oneDay)));

        this.setState({
            days
        });
    }

    render() {
        return (
            <p>{`${this.state.days} days`}</p>
        );
    }
}