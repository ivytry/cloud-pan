import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	fileTree: [],
    searchString: '',
    searchFocusIndex: 0,
    searchFoundCount: null
})

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.INIT_TREE_DATA:
			return state.set("fileTree", action.fileTree);
		case actionTypes.EXPANDED_FOR_ALL:
			return state.set("fileTree", action.fileTree);
		case actionTypes.SELECT_SEARCH_MATCH:
			return state.set("searchFocusIndex", action.index);
		case actionTypes.CHANGE_SEARCH_STRING:
			return state.set("searchString", action.value);
		case actionTypes.SEARCHED_CALLBACK:
			return state.merge({
			    searchFocusIndex: action.index,
			    searchFoundCount: action.count
			})
		default:
			return state;
	}
}

export default reducer