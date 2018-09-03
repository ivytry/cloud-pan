import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { message, Modal, Input } from 'antd';
import 'antd/dist/antd.css';

const success = (msg) => {
  message.success(msg);
};

class FormModal extends PureComponent{
    commitedMsg(){
		success("提交成功，感谢您的反馈！")
    }

	render(){
		const { modalVisible, handleCancel, handleCommit } = this.props
		return (
			<Modal
			  title="意见反馈"
	          visible={modalVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={() => {handleCommit(this.commitedMsg)}}
	          onCancel={()=>{handleCancel()}}
	          width={350}
	        >
    			<Input.TextArea rows={4} placeholder="请在这里输入您的宝贵意见" />
	        </Modal>
        )
	}
}

const mapState = (state) => ({
	modalVisible: state.get("header").get("modalVisible")
})

const mapDispatch = (dispatch) => ({
	handleCancel: () => {
	    dispatch(actionCreator.changeModalVisible(false))
	},
	handleCommit: (commitedMsg) => {
	    dispatch(actionCreator.changeModalVisible(false))
	    commitedMsg()
	}
})

export default connect(mapState, mapDispatch)(FormModal)