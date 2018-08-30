import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { Modal } from 'antd';
import 'antd/dist/antd.css';
import Tree from './Tree';

class MoveToModal extends PureComponent{
	render(){
		const { shareItem, shareVisible, handleOk, handleCancel } = this.props
		return (
			<Modal
	          title="移动到"
	          visible={shareVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={handleOk}
	          onCancel={()=>{handleCancel(shareItem)}}
	        >
	        	<div style={{"height": "400px", "overflow": "scroll"}}>
	        		<Tree />
	        	</div>
	        </Modal>
        )
	}
}

const mapState = (state) => ({
	shareItem: state.get("home").get("shareItem"),
	shareVisible: state.get("home").get("shareVisible"),
})

const mapDispatch = (dispatch) => {
	return {
		handleOk: () => {
		    dispatch(actionCreator.changeOkSuccess(true))
		},
		handleCancel: (item) => {
		    dispatch(actionCreator.changeShareVisible(item, false))
		}
	}
}

export default connect(mapState, mapDispatch)(MoveToModal)