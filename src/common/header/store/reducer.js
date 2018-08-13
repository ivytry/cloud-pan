import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	showbox: false,
	showClassify: false,
	showSpace: false,
	space:{},
	classifyList: []
})

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.SHOWBOX:
			return state.set("showbox", action.flag);
		case actionTypes.SHOWCLASSIFY:
			return state.set("showClassify", action.flag);
		case actionTypes.SHOWSPACE:
			return state.set("showSpace", action.flag);
		case actionTypes.GET_INIT_CLASSIFY_DATA:
			return state.set("classifyList", fromJS(action.data));
		case actionTypes.GET_INIT_SPACE_DATA:
			return state.set("space", fromJS(action.data));
		default:
			return state;
	}
}

export default reducer