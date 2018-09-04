import React, {Component} from 'react';

export default class TimeLeft extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    tick() {
        const oneDay = 24 * 60 * 60 * 1000;
        const oneHour = 60 * 60 * 1000;
        const oneMinute = 60 * 1000;
        const oneSecond = 1000;
        const firstDate = new Date("2019-05-28T14:00:00-07:00");
        const secondDate = Date.now();
        const days = Math.floor(Math.abs((firstDate.getTime() - secondDate) / (oneDay)));
        const hoursRemainder = Math.abs((firstDate.getTime() - secondDate)) % (oneDay);
        const hours = Math.floor(Math.abs(hoursRemainder / oneHour));
        const minutesRemainder = Math.abs(hoursRemainder % oneHour);
        const minutes = Math.floor(Math.abs(minutesRemainder / oneMinute));
        const secondsRemainder = Math.abs(minutesRemainder % oneMinute);
        const seconds = Math.floor(secondsRemainder / oneSecond);

        this.setState({
            days,
            hours,
            minutes,
            seconds
        });
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            this.state.days ?
                <p>{`${this.state.days} days, ${this.state.hours} hours, ${this.state.minutes} minutes, ${this.state.seconds} seconds`}</p>
                :
                <p>{'Calculating...'}</p>
        );
    }
}