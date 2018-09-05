import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';

import { message, Modal, Input, Icon } from 'antd';
import 'antd/dist/antd.css';

const success = (msg) => {
  message.success(msg);
};

class ShareModal extends PureComponent{
    handleCopy(){
		success("已复制到剪切板")
    }

	render(){
		const { shareItem, shareVisible, handleCancel } = this.props
		return (
			<Modal
	          title={"分享文件(夹): "+shareItem.get("title")}
	          visible={shareVisible}
	          cancelText="取消"
	          centered={true}
	          maskClosable={true}
	          okText="复制链接"
	          onOk={this.handleCopy}
	          onCancel={()=>{handleCancel(shareItem)}}
	        >
	        	<Fragment>
	    			<Icon type="check-circle" /> 成功创建分享链接，他人可通过链接查看下载资源
	    			<Input 
	    				value="https://pan.baidu.com/s/1CRBZoSnEM54CT0oGzgF54w" 
	    				readOnly
	    				style={{"marginTop": "10px"}} 
	    				onFocus={this.handleCopy}
	    			/>
			    </Fragment>
	        </Modal>
        )
	}
}

const mapState = (state) => ({
	shareItem: state.get("home").get("shareItem"),
	shareVisible: state.get("home").get("shareVisible"),
	shareForm: state.get("home").get("shareForm"),
	shareExpiry: state.get("home").get("shareExpiry"),
	okSuccess: state.get("home").get("okSuccess")
})

const mapDispatch = (dispatch) => ({
	handleCancel: (item) => {
	    dispatch(actionCreator.changeShareVisible(item, false, ""))
	},
	shareForm: (e) => {
		dispatch(actionCreator.getShareForm(e.target.value))
	},
	handleChangeExpiry: (value) => {
		dispatch(actionCreator.changeExpiry(value))
	}
})

export default connect(mapState, mapDispatch)(ShareModal)