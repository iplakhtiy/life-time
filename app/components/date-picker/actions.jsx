export const SELECT_DATE = 'SELECT_DATE';

export const selectDate = (date) => {
    return {
        type: SELECT_DATE,
        payload: date,
    };
};
