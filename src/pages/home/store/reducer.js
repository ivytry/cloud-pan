import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import Chance from "chance";

const defaultState = fromJS({
	fileTree: [],
    searchString: '',
    searchFocusIndex: 0,
    searchFoundCount: null,
    expanded: false,
    tableList: [],
    selectAll: false,
    selection: [],

    tableId: '',
    path: ['全部文件'],
    
    shareItem: {},
    shareVisible: false,
    shareForm: 1,
    shareExpiry: 0,
    modalType: ''
})

function getData(testData) {
    const chance = new Chance();
    const data = testData.map(item => {
	    const _id = chance.guid();
	    return {
		    _id,
		    ...item
	    };
	});
    return data;
}

function getTree(tree, tableid, state, action){
	tree.map(function(item){
		if(tableid === item.id){
			item.children = action.list
			return
		}else{
			if(item.children){
				getTree(item.children, tableid, state, action)
			}
		}
	})
}

const updateTreeData = (state, action) => {
	let tree = state.get("fileTree")
	let tableid = state.get("tableId")
	if(tableid !== ''){
		getTree(tree, tableid, state, action)
	}else{
		tree = action.list
	}
	return state.set("fileTree", tree).set("tableList", action.list);
}

const changeTableList = (state, action) => {
	return state.set("tableList", getData(action.tableList)).set("tableId", action.tableId);
}

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.INIT_TREE_DATA:
			return state.set("fileTree", action.data).set("tableList", getData(action.data));
		case actionTypes.EXPANDED_FOR_ALL:
			return state.set("fileTree", action.fileTree).set("expanded", action.expanded);
		case actionTypes.CHANGE_CHECKBOX_PROPS:
			return state.set("selection", action.selection).set("selectAll", action.selectAll);
		case actionTypes.CHANGE_SELECTION:
			return state.set("selection", action.selection)
		case actionTypes.SELECT_SEARCH_MATCH:
			return state.set("searchFocusIndex", action.index);
		case actionTypes.CHANGE_SEARCH_STRING:
			return state.set("searchString", action.value);
		case actionTypes.CHANGE_SHARE_FORM:
			return state.set("shareFormVal", action.shareFormVal);
		case actionTypes.CHANGE_SHARE_EXPIRY:
			return state.set("shareExpiry", action.shareExpiry);
		case actionTypes.CHANGE_TABLE_LIST:
			return changeTableList(state, action);
		case actionTypes.UPDATE_TREE_DATA:
			return updateTreeData(state, action);
		case actionTypes.CHANGE_SHARE_VISIBLE:
			return state.merge({
			    shareItem: action.item,
			    shareVisible: action.visible,
			    modalType: action.modalType
			})
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