import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { message, Modal, Icon } from 'antd';
import 'antd/dist/antd.css';

const success = (msg) => {
  message.success(msg);
};

class ExitModal extends PureComponent{
    handleCopy(){
		success("已复制到剪切板")
    }

	render(){
		const { modalVisible, handleCancel, handleChangePwd } = this.props
		return (
			<Modal
	          visible={modalVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={handleChangePwd}
	          onCancel={()=>{handleCancel()}}
	          width={350}
	        >
    			<p><Icon type="exclamation-circle" theme="outlined" style={{color: "orange"}} /> 确认要退出登录吗？</p>
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

export default connect(mapState, mapDispatch)(ExitModal)