import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
	fileTree: [
		{
			id: "all",
			name: "全部文件",
			icon: "&#xe636;",
			children: [
				{
					id: "pic",
					name: "图片",
					icon: "",
					children: []
				},
				{
					id: "file",
					name: "文档",
					icon: "",
					children: []
				},
				{
					id: "video",
					name: "视频",
					icon: "",
					children: []
				},
				{
					id: "seed",
					name: "种子",
					icon: "",
					children: []
				},
				{
					id: "music",
					name: "音乐",
					icon: "",
					children: []
				},
				{
					id: "other",
					name: "其他",
					icon: "",
					children: []
				}
			]
		},
		{
			id: "share",
			name: "我的分享",
			icon: "&#xe65b;",
			children: []
		},
		{
			id: "recycle",
			name: "回收站",
			icon: "&#xe625;",
			children: []
		}
	],
	active: 0
})

const reducer = (state = defaultState, action) => {
	switch(action.type){
		case actionTypes.INIT_TREE_DATA:
			return state.set("fileTree", action.fileTree);
		default:
			return state;
	}
}

export default reducer