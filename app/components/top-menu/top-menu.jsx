import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import DatePickerComponent from '../date-picker/date-picker.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TopMenuComponent extends React.Component {

    defaultSelectedKeys() {
        switch (this.props.routing.location.pathname) {
            case '/diffClock':
                return ['2'];
            case '/':
                return ['1'];
            default:
                return ['1'];
        }
    }

    render() {
        return (
            <Menu
                defaultSelectedKeys={this.defaultSelectedKeys()}
                mode="horizontal"
                style={{
                    opacity: 0.7,
                }}
            >
                <Menu.Item key="1">
                    <Link to="/">Current Status Clock</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/diffClock">Difference Status Clock</Link>
                </Menu.Item>
                <DatePickerComponent/>
            </Menu>
        );
    }
}

TopMenuComponent.propTypes = {
    routing: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        routing: state.routing
    };
};

export default connect(mapStateToProps)(TopMenuComponent);
