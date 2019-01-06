import { GET_DATA, CLEAR_DATA } from './types';

export const getData = () => dispatch => {
    return dispatch({
        type: GET_DATA,
        payload: {
            request: {
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts'
            }
        }
    });
};

export const clearData = () => dispatch => {
    return dispatch({
        type: CLEAR_DATA
    })
}