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

export const isShowBox = (flag) => ({
	type: actionTypes.SHOWBOX,
	flag: flag
})

export const isShowClassify = (flag) => ({
	type: actionTypes.SHOWCLASSIFY,
	flag: flag
})

export const isShowSpace = (flag) => ({
	type: actionTypes.SHOWSPACE,
	flag: flag
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