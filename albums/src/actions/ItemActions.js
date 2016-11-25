import {ITEM_FETCH_SUCCESS,ITEM_FETCH_FAILED,ITEM_REQUEST,EMAIL_CHANGED} from './types';
import axios from 'axios';

function requestData() {
	return {type: ITEM_REQUEST}
};

function receiveData(json) {
	return{
		type: ITEM_FETCH_SUCCESS,
		data: json
	}
};

function receiveError(json) {
	return {
		type: ITEM_FETCH_FAIELD,
		data: json
	}
};

export const getSalam = () => {
	return function(dispatch) { dispatch(requestData())};
}

export const fetchData = () => {
	return function(dispatch) {
    dispatch(requestData());
    return axios.get('http://172.16.10.169/api/ads/2/10')
     .then((response) => dispatch ({
       type: ITEM_FETCH_SUCCESS,
       payload: response.data
     }))
     .catch((response) => dispatch ({
       type: ITEM_FETCH_FAILED,
       payload: response.error
     }))
	 }
};

export const emailChanged = (text) => {
	return {
		type : EMAIL_CHANGED,
		payload:text
	};
};
