import { SELECT_DATE } from './actions.jsx';

export const date = (state = '', action) => {
    switch (action.type) {
        case SELECT_DATE:
            return action.payload;
        default:
            return state;
    }
};
