import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { date } from '../components/date-picker/reducer.jsx';

const rootReducer = combineReducers({
    date,
    routing
});

export default rootReducer;
