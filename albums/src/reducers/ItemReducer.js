import {ITEM_FETCH_SUCCESS,ITEM_FETCH_FAILED,ITEM_REQUEST,EMAIL_CHANGED} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_FETCH_SUCCESS:
           return action.payload;
        case ITEM_FETCH_FAILED:
            return state;
        case ITEM_REQUEST:
              return action;
        case EMAIL_CHANGED:
        //    console.log("nima");
        default:
            return state;
    }
};

