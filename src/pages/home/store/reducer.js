import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	fileTree: [],
    searchString: '',
    searchFocusIndex: 0,
    searchFoundCount: null,
    expanded: false,
    tableList: []
})

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.INIT_TREE_DATA:
			return state.set("fileTree", action.data).set("tableList", action.data);
		case actionTypes.EXPANDED_FOR_ALL:
			return state.set("fileTree", action.fileTree).set("expanded", action.expanded);
		case actionTypes.SELECT_SEARCH_MATCH:
			return state.set("searchFocusIndex", action.index);
		case actionTypes.CHANGE_SEARCH_STRING:
			return state.set("searchString", action.value);
		case actionTypes.CHANGE_TABLE_LIST:
			return state.set("tableList", action.tableList);
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