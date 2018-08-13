import * as actionTypes from './actionTypes';
import axios from 'axios';
import { fromJS } from 'immutable';

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