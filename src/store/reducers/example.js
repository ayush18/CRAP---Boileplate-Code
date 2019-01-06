import {
    GET_DATA,
    GET_DATA_FAIL,
    GET_DATA_SUCCESS,
    CLEAR_DATA
}
    from '../actions/types';

export function example(
    state = {
        data: [],
        getDataComponentState: "LOAD_INITIAL",
        getDataErrorMessage: ""
    },
    action
) {
    switch (action.type) {
        case GET_DATA:
            return Object.assign({}, state, {
                getDataComponentState: "LOAD_START",
                getDataErrorMessage: ""
            });
        case GET_DATA_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload.data,
                getDataComponentState: "LOAD_END"
            });
        case GET_DATA_FAIL:
            return Object.assign({}, state, {
                getDataComponentState: "LOAD_END",
                getDataErrorMessage: "Error Occured"
            });        
        case CLEAR_DATA:
            return Object.assign({}, state, {
                data: [],
                getDataComponentState: "LOAD_INITIAL",
                getDataErrorMessage: ""
            })
        default:
            return state;
    }
}