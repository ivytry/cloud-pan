import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { TreeRoot } from '../style';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class Tree extends PureComponent{
	
	render(){
		const { fileTree, expanded, searchString, searchFocusIndex, searchFoundCount, changeTableList, handleChangeTreeData, handleChange, expandAll, selectPrevMatch, selectNextMatch, handleSearchFinishCallback } = this.props
		return (
			<TreeRoot id="root">
	            <form onSubmit={event => { event.preventDefault() }}>
	                <input
	                	className="treeSearchInput"
		                type="text"
		                placeholder="搜索文件"
		                value={searchString}
		                onChange={event => { handleChange(event) }}
	                />
		            <button
		              type="button"
		              disabled={!searchFoundCount}
		              onClick={()=>{selectPrevMatch(searchFocusIndex, searchFoundCount)}}
		            >
		              &lt;
		            </button>
		            <button
		              type="submit"
		              disabled={!searchFoundCount}
		              onClick={()=>{selectNextMatch(searchFocusIndex, searchFoundCount)}}
		            >
		              &gt;
		            </button>
		            <span>
		              &nbsp;
		              {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
		              &nbsp;/&nbsp;
		              {searchFoundCount || 0}
		            </span>
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

const mapState = (state) => {
	return {
		fileTree: state.get("home").get("fileTree"),
		searchFocusIndex: state.get("home").get("searchFocusIndex"),
		searchFoundCount: state.get("home").get("searchFoundCount"),
		searchString: state.get("home").get("searchString"),
		expanded: state.get("home").get("expanded"),
		tableList: state.get("home").get("tableList")
	}
}

const mapDispatch = (dispatch) => {
	return {
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
		changeTableList: ({node}) => {
			dispatch(actionCreator.changeTableListData(node.children))
		}
	}
}

export default connect(mapState, mapDispatch)(Tree)