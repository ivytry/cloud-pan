import * as actionTypes from './actionTypes';
import axios from 'axios';

const initClassifyData = (data) => ({
	type: actionTypes.GET_INIT_CLASSIFY_DATA,
	data: data
})

const initSpaceData = (data) => ({
	type: actionTypes.GET_INIT_SPACE_DATA,
	data: data
})

const initNavListData = (data) => ({
	type: actionTypes.GET_INIT_NAV_LIST_DATA,
	data: data
})

export const changeUserMsg = (modalType, modalVisible) => ({
	type: actionTypes.CHANGE_USER_MSG,
	modalType,
	modalVisible
})

export const changeModalVisible = (modalVisible) => ({
	type: actionTypes.CHANGE_MODAL_VISIBLE,
	modalVisible
})

export const getInitClassifyData = () => {
	return (dispatch) => {
		axios.get("/api/classify.json").then((res)=>{
			dispatch(initClassifyData(res.data.data))
		})
	}
}

export const getInitSpaceData = () => {
	return (dispatch) => {
		axios.get("/api/space.json").then((res)=>{
			dispatch(initSpaceData(res.data.data))
		})
	}
}

export const getInitNavListData = () => {
	return (dispatch) => {
		axios.get("/api/navList.json").then((res)=>{
			dispatch(initNavListData(res.data.data))
		})
	}
}