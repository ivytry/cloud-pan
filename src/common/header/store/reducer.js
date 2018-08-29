import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	space:{},
	classifyList: [],
	navList: []
})

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.GET_INIT_CLASSIFY_DATA:
			return state.set("classifyList", fromJS(action.data));
		case actionTypes.GET_INIT_SPACE_DATA:
			return state.set("space", fromJS(action.data));
		case actionTypes.GET_INIT_NAV_LIST_DATA:
			return state.set("navList", fromJS(action.data));
		default:
			return state;
	}
}

export default reducer