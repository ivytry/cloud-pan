import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { message, Modal } from 'antd';
import 'antd/dist/antd.css';

const success = (msg) => {
  message.success(msg);
};

class HelpModal extends PureComponent{
    handleCopy(){
		success("已复制到剪切板")
    }

	render(){
		const { modalVisible, handleCancel, handleChangePwd } = this.props
		return (
			<Modal
	          title={"帮助中心"}
	          visible={modalVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={handleChangePwd}
	          onCancel={()=>{handleCancel()}}
	          width={350}
	        >
    			<p>使用指南</p>
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
	}
})

export default connect(mapState, mapDispatch)(HelpModal)