import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { toJS } from 'immutable';

import { message, Modal, Radio, Input, Select, Icon } from 'antd';
import 'antd/dist/antd.css';

class DelModal extends PureComponent{
	render(){
		const { shareItem, shareVisible, handleOk, handleCancel } = this.props
		return (
			<Modal
	          title="删除"
	          visible={shareVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={handleOk}
	          onCancel={()=>{handleCancel(shareItem)}}
	        >
	        	<p>确认要把 {shareItem.get("title")} 放入回收站吗？</p>
				<p>删除的文件可在10天内通过回收站还原</p>
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

export default connect(mapState, mapDispatch)(DelModal)