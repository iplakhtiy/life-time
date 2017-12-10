import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';

import App from '../components/App';

export default function Root({ store, history }) {
    return (
        <LocaleProvider locale={enUS}>
            <Provider store={store} locale={enUS}>
                <div>
                    <ConnectedRouter history={history}>
                        <Route path="/" component={App}/>
                    </ConnectedRouter>
                </div>
            </Provider>
        </LocaleProvider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
