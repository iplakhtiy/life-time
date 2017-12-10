import React from 'react';
import moment from 'moment';
import TimeUnit from '../time-unit/time-unit.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CurrentStatusClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currTime: [],
        };
    }

    componentDidMount() {
        moment.relativeTimeRounding(Math.floor);
        moment.relativeTimeThreshold('d', 31);
        moment.relativeTimeThreshold('M', 12);
        moment.updateLocale('en', {
            relativeTime: {
                future: 'in %s',
                past: '%s ago',
                s: '%d fdf',
                ss: '%d',          // l = 0 or 1
                m: '%d m',
                mm: '%d m',        // l = 2 or 3
                h: '%d hhh',
                hh: '%d hhh',      // l = 4 or 5
                d: '%d ddddd',
                dd: '%d ddddd',    // l = 6 or 7
                M: '%d mmmmmmm',
                MM: '%d mmmmmmm',  // l = 8 or 9
                y: '%d yyyyyyyyy',
                yy: '%d yyyyyyyyy' // l = 10 or 11
            }
        });
        if (this.props.date !== '') {
            this.getCurrTime(this.props.date);
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.date !== this.props.date) {
            clearInterval(this.interval);
            if (nextProps.date !== '') {
                this.getCurrTime(nextProps.date);
                this.interval = setInterval(() => this.tick(), 1000);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getCurrTime(selectedDate) {
        const date = moment(selectedDate);
        const currTime = [];

        let years = date.fromNow(true);

        if (years.length > 10) {
            years = years.replace(/\D/g, '');
            currTime.push({
                time: Number(years) < 10 ? ('0' + years) : years,
                title: 'Years'
            });
        } else {
            currTime.push({ time: '00', title: 'Years' });
        }

        let months = date.add(moment().diff(date, 'years'), 'years').fromNow(true);

        if (months.length > 8) {
            months = months.replace(/\D/g, '');
            currTime.push({
                time: Number(months) < 10 ? ('0' + months) : months,
                title: 'Months'
            });
        } else {
            currTime.push({ time: '00', title: 'Months' });
        }

        let days = date.add(moment().diff(date, 'month'), 'month').fromNow(true);

        if (days.length > 6) {
            days = days.replace(/\D/g, '');
            currTime.push({
                time: Number(days) < 10 ? ('0' + days) : days,
                title: 'Days'
            });

            if (Number(days) > 29) {
                currTime[1].time = '0' + (currTime[1].time - 1);
            }
        } else {
            currTime.push({ time: '00', title: 'Days' });
        }

        currTime.push(
            { time: moment().format('HH'), title: 'Hours' },
            { time: moment().format('mm'), title: 'Minutes' },
            { time: moment().format('ss'), title: 'Seconds' },
        );
        this.setState({ currTime });
    }

    tick() {
        const now = moment();
        const currTime = [];

        currTime[0] = this.state.currTime[0];
        currTime[1] = this.state.currTime[1];
        currTime[2] = this.state.currTime[2];
        currTime[3] = { time: now.format('HH'), title: 'Hours' };
        currTime[4] = { time: now.format('mm'), title: 'Minutes' };
        currTime[5] = { time: now.format('ss'), title: 'Seconds' };

        this.setState({ currTime });
    }

    render() {
        const clock = this.state.currTime.map((item, index) => <TimeUnit time={item.time} title={item.title}
                                                                         key={index}/>);
        return (
            <div className="curr-status-clock-container">
                {this.props.date !== '' ? clock : 'The date is not selected. Please, select the date on the top.'}
            </div>
        );
    }
}

CurrentStatusClock.propTypes = {
    date: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        date: state.date
    };
};

export default connect(mapStateToProps)(CurrentStatusClock);
