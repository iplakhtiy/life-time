import React from 'react';
import moment from 'moment';
import TimeUnit from '../time-unit/time-unit.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DifferenceStatusClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            diffTime: [],
            date: moment(),
            isMilliseconds: false,
            interval: 1000,
        };
    }

    componentDidMount() {
        if (this.props.date !== '') {
            this.setState({ date: this.props.date });
            this.getTimeDiff(this.props.date);
            this.interval = setInterval(() => this.tick(), this.state.interval);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.date !== this.props.date) {
            clearInterval(this.interval);
            if (nextProps.date !== '') {
                this.setState({ date: nextProps.date });
                this.getTimeDiff(nextProps.date);
                this.interval = setInterval(() => this.tick(), this.state.interval);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTimeDiff(selectedDate) {
        const diffTime = [];
        const date = selectedDate;

        diffTime.push({ time: moment().diff(date, 'years'), title: 'Years' },
            { time: moment().diff(date, 'month'), title: 'Month' },
            { time: moment().diff(date, 'weeks'), title: 'Weeks' },
            { time: moment().diff(date, 'days'), title: 'Days' },
            { time: moment().diff(date, 'hours'), title: 'Hours' },
            { time: moment().diff(date, 'minutes'), title: 'Minutes' },
        );

        this.state.isMilliseconds ?
            diffTime.push({ time: moment().diff(date, 'milliseconds'), title: 'Milliseconds' }) :
            diffTime.push({ time: moment().diff(date, 'seconds'), title: 'Seconds' });

        this.setState({ diffTime });
    }

    tick() {
        const now = moment();
        const diffTime = [];
        const date = this.state.date;

        diffTime[0] = this.state.diffTime[0];
        diffTime[1] = this.state.diffTime[1];
        diffTime[2] = this.state.diffTime[2];
        diffTime[3] = this.state.diffTime[3];

        // this.state.isMilliseconds ? this.setState({ interval: 1 }) : this.setState({ interval: 1000 });

        diffTime[4] = { time: now.diff(date, 'hours'), title: 'Hours' };
        diffTime[5] = { time: now.diff(date, 'minutes'), title: 'Minutes' };

        // this.state.isMilliseconds ?
        //     diffTime[ 6 ] = { time: now.diff(date, 'milliseconds'), title: 'Milliseconds' } :
        diffTime[6] = { time: now.diff(date, 'seconds'), title: 'Seconds' };
        this.setState({ diffTime });
    }

    render() {
        const clock = this.state.diffTime.map((item, index) => <TimeUnit time={item.time} title={item.title}
                                                                         key={index}/>);
        return (
            <div className="diff-status-clock-container">
                {this.props.date !== '' ? clock : 'The date is not selected. Please, select the date on the top.'}
            </div>
        );
    }
}

DifferenceStatusClock.propTypes = {
    date: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        date: state.date
    };
};

export default connect(mapStateToProps)(DifferenceStatusClock);
