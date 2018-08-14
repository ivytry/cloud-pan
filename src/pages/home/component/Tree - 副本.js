import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { TreeRoot } from '../style';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { toJS } from 'immutable';

class Tree extends Component{
	render(){
		{ fileTree, } = this.props
		return (
			<TreeRoot id="root">
				<div className="active" father="root">
					<i className="iconfont">&#xe636;</i>
					全部文件
				</div>
				{
					fileTree.map((item) => {
						return (
							<div key={item.id} className="child" father={item.id} id={item.id} onClick={this.props.handleGetChildren}>{item.name}</div>
						)
					})
				}
				<SortableTree
		          treeData={fileTree}
		          theme={FileExplorerTheme}
		        />
			</TreeRoot>
		)
	}
	componentDidMount(){
		this.props.initFileTreeData()
	}
}

const mapState = (state) => {
	return {
		fileTree: state.get("home").get("fileTree")
	}
}

const mapDispatch = (dispatch) => {
	return {
		initFileTreeData: () => {
			dispatch(actionCreator.getInitFileTreeData())
		},
		handleGetChildren: () => {
			dispatch(actionCreator.getChildren())
		}
	}
}

export default connect(mapState, mapDispatch)(Tree)