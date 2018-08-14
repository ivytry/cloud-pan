import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { TreeRoot } from '../style';
import SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';

class Tree extends PureComponent{
	
	render(){
		const { fileTree, searchString, searchFocusIndex, searchFoundCount, handleChange, expandAll, selectPrevMatch, selectNextMatch, handleSearchFinishCallback } = this.props
		return (
			<TreeRoot id="root">
		        <button onClick={() => {expandAll(fileTree, true)}}>展开全部</button>
		        <button onClick={() => {expandAll(fileTree, false)}}>收起全部</button>
	            <form style={{ display: 'inline-block' }} onSubmit={event => { event.preventDefault() }}>
		            <label htmlFor="find-box">
		                <input
			                id="find-box"
			                type="text"
			                value={searchString}
			                onChange={event => { handleChange(event) }}
		                />
		            </label>
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
				</div>
				<div className="nodebox">
					<SortableTree
			            treeData={fileTree}
			            theme={FileExplorerTheme}
			            searchFocusOffset={searchFocusIndex}
			            searchFinishCallback={matches => {handleSearchFinishCallback(matches, searchFocusIndex)}}
			            canDrag={({ node }) => !node.dragDisabled}
			            canDrop = {({ nextParent }) => !nextParent || nextParent.isDirectory}
			            generateNodeProps={
			            	rowInfo => ({
			                icons: rowInfo.node.isDirectory
			                ? [
			                    <div
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
		searchString: state.get("home").get("searchString")
	}
}

const mapDispatch = (dispatch) => {
	return {
		initFileTreeData: () => {
			dispatch(actionCreator.getInitFileTreeData())
		},
		expandAll: (fileTree, expanded) => {
	        dispatch(actionCreator.expandedForAll(toggleExpandedForAll({treeData: fileTree, expanded})))
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
		}
	}
}

export default connect(mapState, mapDispatch)(Tree)