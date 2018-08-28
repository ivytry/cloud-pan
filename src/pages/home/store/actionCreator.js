import * as actionTypes from './actionTypes';
import axios from 'axios';

const initFileTreeData = (data) => ({
	type: actionTypes.INIT_TREE_DATA,
	data
})

export const getInitFileTreeData = (flag) => {
	return (dispatch) => {
		axios.get("/api/inittree.json").then((res)=>{
			dispatch(initFileTreeData(res.data.data))
		}).catch((err)=>{
			console.log(err)
		})
	}
}

export const expandedForAll = (fileTree, expanded) => ({
	type: actionTypes.EXPANDED_FOR_ALL,
	expanded,
	fileTree
})

export const searchedCallback = (count, index) => ({
	type: actionTypes.SEARCHED_CALLBACK,
    index,
    count
})

export const selectPrevMatchData = (index) => ({
	type: actionTypes.SELECT_SEARCH_MATCH,
    index
})

export const change = (value) => ({
	type: actionTypes.CHANGE_SEARCH_STRING,
    value
})

export const changeTableListData = (tableList, tableId, expanded) => ({
	type: actionTypes.CHANGE_TABLE_LIST,
    tableList,
    tableId,
    expanded
})

export const changeCheckboxProps = (selectAll, selection) => ({
	type: actionTypes.CHANGE_CHECKBOX_PROPS,
    selectAll,
    selection
})

export const changeSelection = (selection) => ({
	type: actionTypes.CHANGE_SELECTION,
    selection
})

export const updateTreeData = (list) => ({
	type: actionTypes.UPDATE_TREE_DATA,
	list
})

export const changeShareVisible = (item, visible, modalType) => ({
	type: actionTypes.CHANGE_SHARE_VISIBLE,
	item,
	visible,
	modalType
})

export const changeOkSuccess = (okSuccess) => ({
	type: actionTypes.CHANGE_OK_SUCCESS,
	okSuccess
})

export const getShareForm = (shareFormVal) => ({
	type: actionTypes.CHANGE_SHARE_FORM,
	shareFormVal
})

export const changeExpiry = (shareExpiry) => ({
	type: actionTypes.CHANGE_SHARE_EXPIRY,
	shareExpiry
})