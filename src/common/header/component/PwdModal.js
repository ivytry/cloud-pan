import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { message, Modal, Input, Form } from 'antd';
import 'antd/dist/antd.css';

const FormItem = Form.Item;

const success = (msg) => {
  message.success(msg);
};

class PwdModal extends PureComponent{
    handleCopy(){
		success("已复制到剪切板")
    }

	render(){
		const { modalVisible, handleCancel, handleChangePwd } = this.props
		return (
			<Modal
	          title={"设置密码"}
	          visible={modalVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="确定"
	          onOk={handleChangePwd}
	          onCancel={()=>{handleCancel()}}
	          width={350}
	        >
    			<Form>
				    <FormItem
				      validateStatus="error"
				      help="密码错误"
				    >
				      <Input placeholder="原密码" id="error" type="password" />
				    </FormItem>
				    <FormItem
				      validateStatus="error"
				      help="密码为6-16位数字、英文字母和特殊字符的组合"
				    >
				      <Input placeholder="新密码" id="error" type="password" />
				    </FormItem>
				    <FormItem
				      validateStatus="error"
				      help="两次输入的密码不一致"
				    >
				      <Input placeholder="确认密码" id="error" type="password" />
				    </FormItem>
				</Form>
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

export default connect(mapState, mapDispatch)(PwdModal)