import React from 'react';
import PropTypes from 'prop-types';

export default class TimeUnit extends React.Component {
    render() {
        return (
            <div className="time-unit-container">
                <div className="time-unit-title">
                    {this.props.time}
                </div>
                <div className="time-unit-time">
                    {this.props.title}
                </div>
            </div>
        );
    }
}

TimeUnit.propTypes = {
    time: PropTypes.string,
    title: PropTypes.string,
};
