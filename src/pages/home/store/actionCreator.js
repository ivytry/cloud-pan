import * as actionTypes from './actionTypes';
import axios from 'axios';

const initFileTreeData = (data) => ({
	"type": actionTypes.INIT_TREE_DATA,
	"fileTree": data
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

export const expandedForAll = (fileTree) => ({
	type: actionTypes.EXPANDED_FOR_ALL,
	fileTree
})

export const searchedCallback = (count, index) => ({
	type: actionTypes.SEARCHED_CALLBACK,
    index: index,
    count: count
})

export const selectPrevMatchData = (index) => ({
	type: actionTypes.SELECT_SEARCH_MATCH,
    index: index
})


export const change = (value) => ({
	type: actionTypes.CHANGE_SEARCH_STRING,
    value: value
})