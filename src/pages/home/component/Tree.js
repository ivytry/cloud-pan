import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

import 'antd/dist/antd.css';
import { Input, Icon, Divider } from 'antd';
import { TreeRoot } from '../style';

class Tree extends PureComponent{
	showPage(){
		const { searchFocusIndex, searchFoundCount } = this.props
		if(searchFoundCount){
			return (
				<span>
	              &nbsp;
	              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
	              &nbsp;/&nbsp;
	              {searchFoundCount || 0}
	            </span>
			)
		}
	}

	showBtn(){
		const { searchFocusIndex, searchFoundCount, selectPrevMatch, selectNextMatch } = this.props
		return (
			<div>
        		<Icon 
        			type="left"
            		onClick={()=>{selectPrevMatch(searchFocusIndex, searchFoundCount)}}
        		/>
        		<Divider type="vertical" />
       		    <Icon 
       		    	type="right" 
            		onClick={()=>{selectNextMatch(searchFocusIndex, searchFoundCount)}}
       		    />
			</div>
		)
	}

	render(){
		const { fileTree, expanded, searchString, searchFocusIndex, changeTableList, handleChangeTreeData, handleChange, expandAll, handleSearchFinishCallback } = this.props
		return (
			<TreeRoot id="root" style={{"padding":"20px 0 20px 10px"}}>
	            <form onSubmit={event => { event.preventDefault() }} style={{"paddingRight": "10px"}}>
		            <Input.Search
		            	size="small"
		                placeholder="搜索文件"
		                value={searchString}
		                onChange={event => { handleChange(event)}}
		                enterButton={this.showBtn()}
				    />
		            {this.showPage()}
	            </form>
				<div className="all active" father="root">
					<i className="iconfont">&#xe636;</i>
					全部文件
					<i className="iconfont expand" onClick={() => {expandAll(fileTree, !expanded)}} dangerouslySetInnerHTML={{__html: expanded ? "&#xe620;" : "&#xe61f;" }}></i>
				</div>
				<div className="nodebox">
					<SortableTree
			            treeData={fileTree}
			            onChange={treeData => {handleChangeTreeData(treeData)}}
			            theme={FileExplorerTheme}
			            searchQuery={searchString}
			            searchFocusOffset={searchFocusIndex}
			            searchFinishCallback={matches => {handleSearchFinishCallback(matches, searchFocusIndex)}}
			            canDrag={({ node }) => !node.dragDisabled}
			            canDrop = {({ nextParent }) => !nextParent || nextParent.isDirectory}
			            onMoveNode={({ node, treeIndex, path }) =>
			              global.console.debug(
			                'node:',
			                node,
			                'treeIndex:',
			                treeIndex,
			                'path:',
			                path
			              )
			            }
			            isVirtualized={true}
			            generateNodeProps={
			            	rowInfo => ({
				                icons: rowInfo.node.isDirectory
				                ? [
				                    <div
				                    	onClick={() => changeTableList(rowInfo)}
				                        style={{
					                        borderLeft: 'solid 8px gray',
					                        borderBottom: 'solid 10px gray',
					                        marginRight: 10,
					                        width: 10,
					                        height: 3,
					                        filter: rowInfo.node.expanded
					                          ? 'drop-shadow(1px 0 0 gray) drop-shadow(0 1px 0 gray) drop-shadow(0 -1px 0 gray) drop-shadow(-1px 0 0 gray)'
					                          : 'none',
					                        borderColor: rowInfo.node.expanded ? 'white' : 'gray',
				                        }}
				                    />
				                  ]
				                : [
				                    <div
				                        style={{
					                        border: 'solid 1px black',
					                        fontSize: 8,
					                        textAlign: 'center',
					                        marginRight: 10,
					                        width: 12,
					                        height: 16,
				                        }}
				                    >
				                      	F
				                    </div>
				                  ]
			            	})
				        }
			        />
		        </div>
			</TreeRoot>
		)
	}

	componentDidMount(){
		this.props.initFileTreeData()
	}
}

const mapState = (state) => ({
	fileTree: state.get("home").get("fileTree"),
	searchFocusIndex: state.get("home").get("searchFocusIndex"),
	searchFoundCount: state.get("home").get("searchFoundCount"),
	searchString: state.get("home").get("searchString"),
	expanded: state.get("home").get("expanded"),
	tableList: state.get("home").get("tableList")
})

const mapDispatch = (dispatch) => ({
	initFileTreeData: () => {
		dispatch(actionCreator.getInitFileTreeData())
	},
	expandAll: (fileTree, expanded) => {
        dispatch(actionCreator.expandedForAll(toggleExpandedForAll({treeData: fileTree, expanded}), expanded))
	},
	handleSearchFinishCallback: (matches, searchFocusIndex) => {
		dispatch(actionCreator.searchedCallback(matches.length, matches.length > 0 ? searchFocusIndex % matches.length : 0))
	},
	selectPrevMatch: (index, count) => {
		dispatch(actionCreator.selectPrevMatchData(index !== null ? (count + index - 1) % count : count - 1))
     },
	selectNextMatch: (index, count) => {
		dispatch(actionCreator.selectPrevMatchData(index !== null ? (index + 1) % count : 0))
	},
	handleChange: (e) => {
		dispatch(actionCreator.change(e.target.value))
	},
	handleChangeTreeData: (treeData) => {
		dispatch(actionCreator.expandedForAll(treeData))
	},
	changeTableList: ({node, path}) => {
		console.log(path)
		dispatch(actionCreator.changeTableListData(node.children, node.id, node.expanded))
	}
})

export default connect(mapState, mapDispatch)(Tree)