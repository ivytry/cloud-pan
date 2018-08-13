import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { TreeRoot } from '../style';

class Tree extends Component{
	getTree(){
		const { fileTree, active } = this.props
		const newTree = []

		function getchild(item){
			if(item.children){
				item.children.map((iitem) => {
					newTree.push(<div key={iitem.id} className="child" father={item.id} id={iitem.id}>{iitem.name}</div>)
					getchild(iitem)
				})
			}else{
				newTree.push(<div key={item.id} className="child" father={item.id} id={item.id}>{item.name}</div>)
			}
		}

		fileTree.map((item, index) => {
			const activeClass = (index === active) ? "active" : "";
			newTree.push(
				<div className={activeClass} father="root" key={item.id} id={item.id}>
					<i className="iconfont" dangerouslySetInnerHTML={{__html:item.icon}}></i>
					{item.name}
				</div>
			)
			getchild(item)
		})

		return newTree
	}
	render(){
		return (
			<TreeRoot id="root">
				{ this.getTree() }
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
		active: state.get("home").get("active")
	}
}

const mapDispatch = (dispatch) => {
	return {
		initFileTreeData: () => {
			dispatch(actionCreator.getInitFileTreeData())
		}
	}
}

export default connect(mapState, mapDispatch)(Tree)