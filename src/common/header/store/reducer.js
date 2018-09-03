import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	space:{},
	classifyList: [],
	navList: [],
	modalType: '',
	modalVisible: false,
	informVisible: false,
	drawerType: ''
})

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.GET_INIT_CLASSIFY_DATA:
			return state.set("classifyList", fromJS(action.data));
		case actionTypes.GET_INIT_SPACE_DATA:
			return state.set("space", fromJS(action.data));
		case actionTypes.GET_INIT_NAV_LIST_DATA:
			return state.set("navList", fromJS(action.data));
		case actionTypes.CHANGE_USER_MSG:
			return state.merge({
				modalType: action.modalType,
				modalVisible: action.modalVisible
			});
		case actionTypes.CHANGE_MODAL_VISIBLE:
			return state.set("modalVisible", action.modalVisible);
		case actionTypes.CHANGE_INFORM_VISIBLE:
			return state.merge({
				"informVisible": action.informVisible,
				"drawerType": action.drawerType
			});
		default:
			return state;
	}
}

export default reducer