import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CurrentStatusClock from './components/clocks/curr-status-clock/curr-status-clock.jsx';
import DifferenceStatusClock from './components/clocks/diff-status-clock/diff-status-clock.jsx';

export default (
	<Switch>
		<Route exact path="/" component={CurrentStatusClock} />
		<Route exact path="/diffClock" component={DifferenceStatusClock} />
	</Switch>
);
