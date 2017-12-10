import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { selectDate } from './actions.jsx';
import { DatePicker } from 'antd';

class DatePickerComponent extends React.Component {
    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }

    render() {
        return (
            <DatePicker onChange={(_, dateStr) => this.props.onSelectDate(dateStr)}
                        disabledDate={this.disabledDate}/>
        );
    }
}

DatePickerComponent.propTypes = {
    onSelectDate: PropTypes.func,
    date: PropTypes.string,
};

const mapStateToProps = (state) => {
    return { date: state.date };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectDate: (date) => dispatch(selectDate(date))
    };
};

export default connect(
  mapStateToProps,
    mapDispatchToProps
)(DatePickerComponent);
